package com.example.demo.board.repository.customRepository;

import static com.example.demo.board.entity.QPost.*;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import com.example.demo.board.dto.PostPagingDto;
import com.example.demo.board.entity.Post;
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
	public Page<Post> searchPost(PostPagingDto postPagingDto, Pageable pageable) {
		List<Post> posts = jpaQueryFactory
			.selectFrom(post)
			.leftJoin(post.writer).fetchJoin()
			.where(allLike(postPagingDto))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();

		JPAQuery<Long> countQuery = jpaQueryFactory
			.select(post.count())
			.from(post)
			.where(allLike(postPagingDto));

		return PageableExecutionUtils.getPage(posts, pageable, countQuery::fetchOne);
	}

	private BooleanExpression writerLike(String nicknameCond) {
		return nicknameCond != null ? post.writer.nickname.like("%"+nicknameCond+"%") : null;
	}

	private BooleanExpression titleLike(String titleCond) {
		return titleCond != null ? post.title.like("%"+titleCond+"%") : null;
	}

	private BooleanExpression contentLike(String contentCond) {
		return contentCond != null ? post.content.like("%"+contentCond+"%") : null;
	}

	private BooleanExpression allLike(PostPagingDto postPagingDto) {
		return writerLike(postPagingDto.getWriter())
			.and(titleLike(postPagingDto.getTitle()))
			.and(contentLike(postPagingDto.getContent()));
	}
}
