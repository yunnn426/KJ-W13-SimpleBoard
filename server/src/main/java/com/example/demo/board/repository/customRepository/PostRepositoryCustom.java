package com.example.demo.board.repository.customRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.NoRepositoryBean;

import com.example.demo.board.dto.RequestSearchPostDto;
import com.example.demo.board.entity.Post;

// dsl
@NoRepositoryBean
public interface PostRepositoryCustom {

	Page<Post> searchPost(RequestSearchPostDto requestSearchPostDto, Pageable pageable);
	boolean existsLikeWithUsername(Long postId, String username);

}
