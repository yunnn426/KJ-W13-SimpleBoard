package com.example.demo.board.entity;

import com.example.demo.config.BaseTimeEntity;
import com.example.demo.member.entity.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Comment extends BaseTimeEntity {

	@Id
	@Column(name = "comment_id")
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long commentId;

	private String comment;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "post_id")
	private Post post;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	public void setMember(Member member) {
		this.member = member;
		if (!member.getCommentList().contains(this)) {
			member.getCommentList().add(this);
		}
	}

	public void setPost(Post post) {
		this.post = post;
		if (!post.getCommentList().contains(this)) {
			post.getCommentList().add(this);
		}
	}

	public void deleteComment() {
		Post post = this.getPost();
		if (post != null) {
			post.getCommentList().remove(this);
		}
		Member member = this.getMember();
		if (member != null) {
			member.getCommentList().remove(this);
		}
	}
}
