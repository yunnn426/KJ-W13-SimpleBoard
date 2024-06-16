package com.example.demo.board.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.board.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long> {

	@Query("select p from Post p "
			+ "join fetch p.writer "
			+ "where p.postId = :postId"
	)
	Optional<Post> findByIdWithWriter(@Param("postId") Long id);

	@Query("select p from Post p "
		+ "where p.postId = :postId"
	)
	Optional<Post> findByIdWithCommentList(@Param("postId") Long id);
}
