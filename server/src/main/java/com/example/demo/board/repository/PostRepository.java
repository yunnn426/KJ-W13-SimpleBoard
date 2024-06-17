package com.example.demo.board.repository;

import com.example.demo.board.repository.JpaRepository.PostJpaRepository;
import com.example.demo.board.repository.customRepository.PostRepositoryCustom;

public interface PostRepository extends PostJpaRepository, PostRepositoryCustom {
}
