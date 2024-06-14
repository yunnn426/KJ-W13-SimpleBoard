package com.example.demo.member.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MemberSignInDto {

	private String username;
	private String password;

}
