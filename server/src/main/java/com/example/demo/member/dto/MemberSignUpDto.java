package com.example.demo.member.dto;

import java.util.List;

import com.example.demo.member.entity.Member;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberSignUpDto {

	@NotBlank(message = "Username is mandatory")
	// @Size(min = 4, max = 20, message = "Username must be between 4 and 20 characters")
	private String username;

	@NotBlank(message = "Password is mandatory")
	// @Size(min = 8, message = "Password must be at least 8 characters")
	private String password;

	@NotBlank(message = "Nickname is mandatory")
	@Size(min = 2, max = 30, message = "Nickname must be between 2 and 30 characters")
	private String nickname;

	public Member toEntity(String encodedPassword, List<String> roles) {
		return Member.builder()
			.username(username)
			.password(encodedPassword)
			.nickname(nickname)
			.roles(roles)
			.build();
	}
}
