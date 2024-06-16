package com.example.demo.board.repository;

import static com.example.demo.board.entity.QPost.*;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import com.example.demo.board.dto.RequestSearchPostDto;
import com.example.demo.board.entity.Post;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class PostDslRepositoryImpl implements PostDslRepository{

	public JPAQueryFactory jpaQueryFactory;

	@Override
	public Page<Post> searchPost(RequestSearchPostDto requestSearchPostDto, Pageable pageable) {
		List<Post> posts = jpaQueryFactory
			.selectFrom(post)
			.leftJoin(post.writer)
			.where(allLike(requestSearchPostDto))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();

		return null;
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
