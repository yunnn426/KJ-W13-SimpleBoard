package com.example.demo.member.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.auth.jwt.JwtToken;
import com.example.demo.auth.jwt.JwtTokenProvider;
import com.example.demo.member.dto.MemberDto;
import com.example.demo.member.dto.MemberSignUpDto;
import com.example.demo.member.entity.Member;
import com.example.demo.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class MemberService {

	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	private final JwtTokenProvider jwtTokenProvider;
	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;

	@Transactional
	public JwtToken signIn(String username, String password) {
		UsernamePasswordAuthenticationToken authenticationToken =
			new UsernamePasswordAuthenticationToken(username, password);
		Authentication authentication = authenticationManagerBuilder.getObject()
			.authenticate(authenticationToken);
		String nickname = getNicknameByUsername(username);
		return jwtTokenProvider.generateToken(authentication, nickname);
	}

	@Transactional
	public MemberDto signUp(MemberSignUpDto memberSignUpDto) {
		if (memberRepository.existsByUsername(memberSignUpDto.getUsername())) {
			throw new IllegalArgumentException("Username %s is already in use.".formatted(memberSignUpDto.getUsername()));
		}

		String encodedPassword = passwordEncoder.encode(memberSignUpDto.getPassword());
		List<String> roles = new ArrayList<>();
		roles.add("USER");
		return MemberDto.toDto(memberRepository.save(memberSignUpDto.toEntity(encodedPassword, roles)));
	}

	private String getNicknameByUsername(String username) {
		Member member = memberRepository.findByUsername(username)
			.orElseThrow(() -> new IllegalArgumentException("Username " + username + " not found."));
		return member.getNickname();
	}

}
