package com.example.demo.board.dto;

import java.time.LocalDateTime;

import com.example.demo.board.entity.Post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ResponsePagePostDto {

	private Long postId;
	private String title;
	private String content;
	private String writer;
	private LocalDateTime createdDate;
	private LocalDateTime lastModifiedDate;

	public static ResponsePagePostDto toDto(Post post) {
		return ResponsePagePostDto.builder()
			.postId(post.getPostId())
			.title(post.getTitle())
			.content(post.getContent())
			.writer(post.getWriter().getNickname())
			.createdDate(post.getCreatedDate())
			.lastModifiedDate(post.getLastModifiedDate())
			.build();
	}

}
