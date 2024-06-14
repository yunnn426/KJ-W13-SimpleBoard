package com.example.demo.board.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.board.entity.Post;

public interface BoardRepository extends JpaRepository<Post, Long> {

	@Query(
		"select b from Post b "
			+ "join fetch b.writer"
	)
	Optional<Post> findByIdWithWriter(Long id);
}
