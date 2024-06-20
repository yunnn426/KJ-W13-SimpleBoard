package com.example.demo.member.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.member.entity.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

	@Query("select m from Member m "
		+ "where m.username = :username")
	Optional<Member> findByUsername(@Param("username") String username);

	default Member findByUsernameWithoutOptional (String username) {
		return findByUsername(username).orElseThrow(() -> new IllegalArgumentException("%s is not found".formatted(username)));
	}

	Boolean existsByUsername(String username);
}
