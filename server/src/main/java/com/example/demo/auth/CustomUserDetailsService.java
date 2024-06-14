package com.example.demo.auth;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.member.entity.Member;
import com.example.demo.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return memberRepository.findByUsername(username)
			.map(this::createUserDetail)
			.orElseThrow(() -> new UsernameNotFoundException("%s not found".formatted(username)));
	}

	private UserDetails createUserDetail(Member member) {
		return User.builder()
			.username(member.getUsername())
			.password(passwordEncoder.encode(member.getPassword()))
			.roles(member.getRoles().toArray(new String[0]))
			.build();
	}
}
