package com.example.demo.board.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.board.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {

	@Query("select c from Comment c "
			+ "join fetch c.member m "
			+ "join fetch c.post p "
			+ "where p.postId = :postId")
	List<Comment> findAllByPostId(@Param("postId") Long postId);

	@Query("select c from Comment c "
		+ "join fetch c.member m "
		+ "join fetch c.post p "
		+ "where c.commentId = :commentId")
	Optional<Comment> findByCommentId(@Param("commentId") Long commentId);
}
