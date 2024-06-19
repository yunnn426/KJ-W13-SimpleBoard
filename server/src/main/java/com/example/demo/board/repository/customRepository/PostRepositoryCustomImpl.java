package com.example.demo.board.repository.customRepository;

import static com.example.demo.board.entity.QPost.*;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.stereotype.Repository;

import com.example.demo.board.dto.PostPagingDto;
import com.example.demo.board.entity.Post;
import com.example.demo.board.entity.QPost;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
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
			.where(
				writerLike(postPagingDto.getWriter()),
				titleLike(postPagingDto.getTitle()),
				contentLike(postPagingDto.getContent())
			)
			.orderBy(getOrderSpecifier(postPagingDto))
			.offset(pageable.getOffset())
			.limit(pageable.getPageSize())
			.fetch();

		JPAQuery<Long> countQuery = jpaQueryFactory
			.select(post.count())
			.from(post)
			.where(
				writerLike(postPagingDto.getWriter()),
				titleLike(postPagingDto.getTitle()),
				contentLike(postPagingDto.getContent())
			);

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

	private OrderSpecifier<?> getOrderSpecifier(PostPagingDto postPagingDto) {
		PathBuilder<Post> entityPath = new PathBuilder<>(Post.class, "post");
		if (postPagingDto.getSort().equals("ACS")) {
			return new OrderSpecifier(Order.ASC, entityPath.get(postPagingDto.getSortField()));
		} else {
			return new OrderSpecifier(Order.DESC, entityPath.get(postPagingDto.getSortField()));
		}
	}


}
