package com.example.demo.board.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class UpdatePostDto {

	private Long id;
	private String title;
	private String content;

}
