package com.example.demo.member.dto;

import java.util.ArrayList;
import java.util.List;

import com.example.demo.member.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberSignUpDto {

	private String username;
	private String password;
	private String nickname;

	public Member toEntity(String encodedPassword, List<String> roles) {
		return Member.builder()
			.username(username)
			.password(password)
			.nickname(nickname)
			.roles(roles)
			.build();
	}
}
