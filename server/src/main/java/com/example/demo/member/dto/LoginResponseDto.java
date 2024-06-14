package com.example.demo.member.dto;

import com.example.demo.auth.jwt.JwtToken;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponseDto {
	private JwtToken jwtToken;
	private String nickname;
}
