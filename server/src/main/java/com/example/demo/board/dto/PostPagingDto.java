package com.example.demo.board.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostPagingDto {

	@Min(value = 0, message = "Page number must be zero or greater")
	private int page;

	@Min(value = 1, message = "Page size must be one or greater")
	private int size;

	@NotBlank(message = "Sort direction is mandatory")
	@Pattern(regexp = "DESC|ASC", message = "Sort direction must be either DESC or ASC")
	private String sort;

	// 정렬할 field 의 이름
	@NotBlank(message = "Sort field is mandatory")
	private String sortField;

	private String title;
	private String content;
	private String writer;
}
