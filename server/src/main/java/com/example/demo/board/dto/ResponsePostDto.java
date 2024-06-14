package com.example.demo.board.dto;

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
public class ResponsePostDto {

	private Long boardId;
	private String title;
	private String content;
	private String writer;

	public static ResponsePostDto toDto(Post post) {
		return ResponsePostDto.builder()
			.boardId(post.getPostId())
			.title(post.getTitle())
			.content(post.getContent())
			.writer(post.getWriter().getNickname())
			.build();
	}

}
