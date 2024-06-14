package com.example.demo.board.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.board.dto.CreatePostDto;
import com.example.demo.board.dto.ResponsePostDto;
import com.example.demo.board.dto.PostPagingDto;
import com.example.demo.board.dto.UpdatePostDto;
import com.example.demo.board.entity.Post;
import com.example.demo.board.repository.BoardRepository;
import com.example.demo.member.entity.Member;
import com.example.demo.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class BoardService {

	private final BoardRepository boardRepository;
	private final MemberRepository memberRepository;

	@Transactional
	public CreatePostDto createPost(CreatePostDto createPostDto, String username) {
		Member member = memberRepository.findByUsername(username)
			.orElseThrow(() -> new IllegalArgumentException("Username : " + username + " not found"));
		Post post = createPostDto.toEntity(member);
		boardRepository.save(post);
		return createPostDto;
	}

	@Transactional
	public UpdatePostDto updatePost(UpdatePostDto boardUpdateDto) {
		Post post = boardRepository.findById(boardUpdateDto.getId())
			.orElseThrow(() -> new IllegalArgumentException("Board : " + boardUpdateDto.getId() + " not found"));
		post.updateBoard(boardUpdateDto);
		return boardUpdateDto;
	}

	@Transactional
	public void deletePost(Long boardId, String username) {
		Post post = boardRepository.findByIdWithWriter(boardId)
			.orElseThrow(() -> new IllegalArgumentException("Board : " + boardId + " not found"));

		if (post.getWriter().getUsername().equals(username)) {
			boardRepository.delete(post);
		} else {
			throw new IllegalArgumentException("Invalid Request");
		}


	}

	public Page<ResponsePostDto> findAllPost(PostPagingDto postPagingDto) {
		Sort sort = Sort.by(Sort.Direction.fromString(postPagingDto.getSort()), "post_id");
		Pageable pageable = PageRequest.of(postPagingDto.getPage(), postPagingDto.getSize(), sort);

		Page<Post> posts = boardRepository.findAll(pageable);

		Page<ResponsePostDto> postDtoPages = posts.map(ResponsePostDto::toDto);
		return postDtoPages;
	}
}
