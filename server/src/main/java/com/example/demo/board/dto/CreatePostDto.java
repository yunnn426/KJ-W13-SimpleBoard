package com.example.demo.board.dto;

import com.example.demo.board.entity.Post;
import com.example.demo.member.entity.Member;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Builder
@AllArgsConstructor
public class CreatePostDto {

	@NotBlank
	private String title;
	private String content;

	public Post toEntity(Member member) {
		return Post.builder()
			.title(title)
			.content(content)
			.writer(member)
			.build();

	}
}
