package com.example.demo.board.dto;

import com.example.demo.board.entity.Post;
import com.example.demo.config.DateTimeUtil;

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
	private String writer;
	private String createdDate;
	private String lastModifiedDate;

	public static ResponsePagePostDto toDto(Post post) {
		return ResponsePagePostDto.builder()
			.postId(post.getPostId())
			.title(post.getTitle())
			.writer(post.getWriter().getNickname())
			.createdDate(DateTimeUtil.formatDateTime(post.getCreatedDate()))
			.lastModifiedDate(DateTimeUtil.formatDateTime(post.getLastModifiedDate()))
			.build();
	}

}
