package com.example.demo.member.dto;

import jakarta.validation.constraints.NotBlank;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class MemberSignInDto {

	@NotBlank(message = "Username is mandatory")
	private final String username;

	@NotBlank(message = "Password is mandatory")
	private final String password;
}
