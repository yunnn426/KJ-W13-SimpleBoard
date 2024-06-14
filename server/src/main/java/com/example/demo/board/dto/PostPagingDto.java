package com.example.demo.board.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostPagingDto {

	private int page;
	private int size;
	// DESC
	// ASC
	private String sort;

}
