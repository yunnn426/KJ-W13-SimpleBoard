package com.example.demo.board.repository;

import org.springframework.stereotype.Repository;

import com.example.demo.board.repository.JpaRepository.PostJpaRepository;
import com.example.demo.board.repository.customRepository.PostRepositoryCustom;

@Repository
public interface PostRepository extends PostJpaRepository, PostRepositoryCustom {
}
