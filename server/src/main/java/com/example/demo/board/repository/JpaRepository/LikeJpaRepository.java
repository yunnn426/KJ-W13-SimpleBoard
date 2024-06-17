package com.example.demo.board.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.board.entity.LikeTable;

public interface LikeJpaRepository extends JpaRepository<LikeTable, Long> {

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

	@Query("select l from LikeTable l "
		+ "left join l.member m "
		+ "join fetch l.post p "
		+ "where m.username = :username "
		+ "and p.postId = :postId")
	Optional<LikeTable> findByUsername(@Param("postId") Long postId, @Param("username") String username);

	@Query("select case when count(l) > 0 then true else false end from LikeTable l "
		+ "join l.member m "
		+ "join l.post p "
		+ "where p.postId = :postId and m.username = :username")
	boolean existsLikeWithUsername(@Param("postId") Long postId, @Param("username") String username);
}
