package com.example.demo.board.repository.customRepository;

import static com.example.demo.board.entity.QLikeTable.*;
import static com.example.demo.board.entity.QPost.*;
import static com.example.demo.member.entity.QMember.*;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import com.example.demo.board.dto.RequestSearchPostDto;
import com.example.demo.board.entity.Post;
import com.example.demo.board.entity.QLikeTable;
import com.example.demo.board.entity.QPost;
import com.example.demo.member.entity.QMember;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
@RequiredArgsConstructor
public class PostRepositoryCustomImpl implements PostRepositoryCustom {

	private final JPAQueryFactory jpaQueryFactory;

	@Override
	public Page<Post> searchPost(RequestSearchPostDto requestSearchPostDto, Pageable pageable) {
		List<Post> posts = jpaQueryFactory
			.selectFrom(post)
			.leftJoin(post.writer).fetchJoin()
			.where(allLike(requestSearchPostDto))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();

		JPAQuery<Long> countQuery = jpaQueryFactory
			.select(post.count())
			.from(post)
			.where(allLike(requestSearchPostDto));

		return PageableExecutionUtils.getPage(posts, pageable, countQuery::fetchOne);
	}

	private BooleanExpression nicknameLike(String nicknameCond) {
		return nicknameCond != null ? post.writer.nickname.like("%"+nicknameCond+"%") : null;
	}

	private BooleanExpression titleLike(String titleCond) {
		return titleCond != null ? post.title.like("%"+titleCond+"%") : null;
	}

	private BooleanExpression contentLike(String contentCond) {
		return contentCond != null ? post.content.like("%"+contentCond+"%") : null;
	}

	private BooleanExpression allLike(RequestSearchPostDto requestSearchPostDto) {
		return nicknameLike(requestSearchPostDto.getNickname())
			.and(titleLike(requestSearchPostDto.getTitle()))
			.and(contentLike(requestSearchPostDto.getContent()));
	}
}
