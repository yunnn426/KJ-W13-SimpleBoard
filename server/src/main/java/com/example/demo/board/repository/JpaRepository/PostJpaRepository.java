package com.example.demo.board.repository.JpaRepository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.board.dto.RequestSearchPostDto;
import com.example.demo.board.entity.Post;

// data
public interface PostJpaRepository extends JpaRepository<Post, Long> {

	@Query("select p from Post p "
			+ "join fetch p.writer "
			+ "where p.postId = :postId")
	Optional<Post> findByIdWithWriter(@Param("postId") Long id);

	@Query("select p from Post p "
		+ "where p.postId = :postId")
	Optional<Post> findByIdWithCommentList(@Param("postId") Long id);

	Page<Post> searchPost(RequestSearchPostDto requestSearchPostDto, Pageable pageable);
}
