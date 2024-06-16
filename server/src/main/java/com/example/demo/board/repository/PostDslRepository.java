package com.example.demo.board.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.demo.board.dto.RequestSearchPostDto;
import com.example.demo.board.entity.Post;

public interface PostDslRepository {

	Page<Post> searchPost(RequestSearchPostDto requestSearchPostDto, Pageable pageable);
}
