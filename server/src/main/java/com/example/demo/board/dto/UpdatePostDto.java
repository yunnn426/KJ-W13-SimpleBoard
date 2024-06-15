package com.example.demo.board.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class UpdatePostDto {

	@NotNull(message = "ID is mandatory")
	private Long id;

	@NotBlank(message = "Title is mandatory")
	@Size(max = 100, message = "Title must be less than 100 characters")
	private String title;

	@NotBlank(message = "Content is mandatory")
	private String content;
}
