package com.example.demo.board.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.board.dto.CreatePostDto;
import com.example.demo.board.dto.ResponsePagePostDto;
import com.example.demo.board.dto.ResponsePostDto;
import com.example.demo.board.dto.UpdatePostDto;
import com.example.demo.board.dto.PostPagingDto;
import com.example.demo.board.service.BoardService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/board")
public class BoardController {

	private final BoardService boardService;
	private final PagedResourcesAssembler<ResponsePagePostDto> pagedResourcesAssembler;

	@PostMapping("/create")
	@ResponseStatus(HttpStatus.CREATED)
	public CreatePostDto createPost(
		@AuthenticationPrincipal UserDetails userDetails,
		@Valid @RequestBody CreatePostDto createPostDto
	) {
		String username = userDetails.getUsername();
		return boardService.createPost(createPostDto, username);
	}

	@PatchMapping("/update")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public UpdatePostDto updatePost(
		@AuthenticationPrincipal UserDetails userDetails,
		@Valid @RequestBody UpdatePostDto boardUpdateDto
	) {
		return boardService.updatePost(boardUpdateDto, userDetails.getUsername());
	}

	@DeleteMapping("/delete/{postId}")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public ResponseEntity<Void> deletePost(
		@AuthenticationPrincipal UserDetails userDetails,
		@PathVariable("postId") Long postId
	) {
		boardService.deletePost(postId, userDetails.getUsername());
		return ResponseEntity.ok().build();
	}

	@PostMapping("/posts")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public PagedModel<EntityModel<ResponsePagePostDto>> getPagingPost(@Valid @RequestBody PostPagingDto postPagingDto) {
		Page<ResponsePagePostDto> page = boardService.findAllPost(postPagingDto);
		return pagedResourcesAssembler.toModel(page);
	}

	@GetMapping("/posts/{postId}")
	@ResponseStatus(HttpStatus.ACCEPTED)
	public ResponsePostDto getPostById(
		@PathVariable("postId") Long postId
	) {
		log.info("Get post by id: {}", postId);
		return boardService.getPostById(postId);
	}
}
