package com.example.demo.member.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.member.dto.MemberDto;
import com.example.demo.member.dto.MemberSignInDto;
import com.example.demo.member.dto.MemberSignUpDto;
import com.example.demo.member.service.MemberService;
import com.example.demo.auth.jwt.JwtToken;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequiredArgsConstructor
public class MemberController {

	private final MemberService memberService;

	@PostMapping("/signin")
	public JwtToken signIn(@RequestBody MemberSignInDto memberSignInDto) {
		return memberService.signIn(memberSignInDto.getUsername(), memberSignInDto.getPassword());
	}

	@PostMapping("/signup")
	public ResponseEntity<MemberDto> signUp(@RequestBody MemberSignUpDto memberSignUpDto) {
		MemberDto savedMemberDto = memberService.signUp(memberSignUpDto);
		return ResponseEntity.ok(savedMemberDto);
	}
}
