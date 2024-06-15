package com.example.demo.board.dto;

import java.time.LocalDateTime;

import com.example.demo.board.entity.Comment;
import com.example.demo.member.entity.Member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResponsePostCommentDto {

	private Long memberId;
	private Long commentId;
	private String nickname;
	private String comment;

	private LocalDateTime createdDate;
	private LocalDateTime lastModifiedDate;

	public static ResponsePostCommentDto toDto(Comment comment) {
		return ResponsePostCommentDto.builder()
			.memberId(comment.getMember().getId())
			.commentId(comment.getCommentId())
			.nickname(comment.getMember().getNickname())
			.comment(comment.getComment())
			.createdDate(comment.getCreatedDate())
			.lastModifiedDate(comment.getLastModifiedDate())
			.build();
	}
}
