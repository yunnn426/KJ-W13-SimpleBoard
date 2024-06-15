package com.example.demo.board.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.example.demo.board.entity.Comment;
import com.example.demo.board.entity.LikeTable;
import com.example.demo.board.entity.Post;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponsePostDto {

	private Long postId;
	private String title;
	private String content;
	private String writer;
	private Long writerId;

	private LocalDateTime createdDate;
	private LocalDateTime lastModifiedDate;

	@Builder.Default
	private List<ResponsePostCommentDto> responsePostCommentDtoList = new ArrayList<>();
	@Builder.Default
	private List<ResponsePostLikeDto> responsePostLikeDtoList = new ArrayList<>();

	public static ResponsePostDto toDto(Post post, List<Comment> comments, List<LikeTable> likes) {
		return ResponsePostDto.builder()
			.postId(post.getPostId())
			.title(post.getTitle())
			.content(post.getContent())
			.writer(post.getWriter().getNickname())
			.writerId(post.getWriter().getId())
			.createdDate(post.getCreatedDate())
			.lastModifiedDate(post.getLastModifiedDate())
			.responsePostCommentDtoList(comments.stream()
				.map(ResponsePostCommentDto::toDto)
				.toList())
			.responsePostLikeDtoList(likes.stream()
				.map(ResponsePostLikeDto::toDto)
				.toList())
			.build();
	}



}
