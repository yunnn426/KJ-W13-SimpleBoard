package com.example.demo.board.dto;

import java.time.LocalDateTime;

import com.example.demo.board.entity.LikeTable;
import com.example.demo.member.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponsePostLikeDto {
	private Long memberId;
	private String memberNickname;

	private LocalDateTime createDate;

	public static ResponsePostLikeDto toDto(LikeTable likeTable) {
		return ResponsePostLikeDto.builder()
			.memberId(likeTable.getMember().getId())
			.memberNickname(likeTable.getMember().getNickname())
			.createDate(likeTable.getCreatedDate())
			.build();
	}
}
