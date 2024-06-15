package com.example.demo.board.dto;

import com.example.demo.board.entity.Comment;
import com.example.demo.board.entity.LikeTable;
import com.example.demo.board.entity.Post;
import com.example.demo.member.entity.Member;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class CreateCommentOrLikeDto {

	@NotNull(message = "PostId is mandatory")
	private Long postId;

	// @NotBlank(message = "Comment is mandatory")
	private String comment;
	private CommentOrLike commentOrLike;

	public static Comment toCommentEntity(CreateCommentOrLikeDto createCommentOrLikeDto, Member member, Post post) {
		Comment comment = Comment.builder()
			.comment(createCommentOrLikeDto.getComment())
			.build();
		comment.setMember(member);
		comment.setPost(post);
		return comment;
	}

	public static LikeTable toLikeEntity(CreateCommentOrLikeDto createCommentOrLikeDto, Member member, Post post) {
		LikeTable likeTable = LikeTable.builder()
			.build();
		likeTable.setMember(member);
		likeTable.setPost(post);
		return likeTable;
	}
}

