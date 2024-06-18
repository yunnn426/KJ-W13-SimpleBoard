package com.example.demo.board.repository.customRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.demo.board.dto.PostPagingDto;
import com.example.demo.board.entity.Post;

public interface PostRepositoryCustom {

	Page<Post> searchPost(PostPagingDto postPagingDto, Pageable pageable);

}
