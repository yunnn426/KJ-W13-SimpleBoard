package com.example.demo.member.dto;

import com.example.demo.member.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MemberDto {

	private Long id;
	private String username;
	private String nickname;

	public static MemberDto toDto(Member member) {
		return MemberDto.builder()
			.id(member.getId())
			.username(member.getUsername())
			.nickname(member.getNickname())
			.build();
	}

	public Member toEntity() {
		return Member.builder()
			.id(id)
			.username(username)
			.nickname(nickname)
			.build();
	}
}
