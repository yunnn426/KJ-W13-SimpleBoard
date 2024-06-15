package com.example.demo.board.dto;

import com.example.demo.board.entity.Post;
import com.example.demo.member.entity.Member;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class CreateCommentDto {

	@NotBlank(message = "Title is mandatory")
	@Size(max = 100, message = "Title must be less than 100 characters")
	private String title;
	@NotBlank(message = "Content is mandatory")
	private String content;

	public Post toEntity(Member member) {
		return Post.builder()
			.title(title)
			.content(content)
			.writer(member)
			.build();

	}
}
