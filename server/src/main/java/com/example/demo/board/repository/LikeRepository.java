package com.example.demo.board.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.board.entity.Comment;
import com.example.demo.board.entity.LikeTable;

public interface LikeRepository extends JpaRepository<LikeTable, Long> {

	@Query("select l from LikeTable l "
		+ "join fetch l.member m "
		+ "join fetch l.post p "
		+ "where p.postId = :postId")
	List<LikeTable> findAllByPostId(@Param("postId") Long postId);

	@Query("select l from LikeTable l "
		+ "join fetch l.member m "
		+ "join fetch l.post p "
		+ "where l.like_id = :likeId")
	Optional<LikeTable> findByLikeId(@Param("likeId") Long commentId);
}
