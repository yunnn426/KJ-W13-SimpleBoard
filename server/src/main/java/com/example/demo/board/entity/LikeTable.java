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
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "LikeTable", uniqueConstraints = {
	@UniqueConstraint(columnNames = {"post_id", "member_id"})
})
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class LikeTable extends BaseTimeEntity {

	@Id
	@Column(name = "like_id")
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long like_id;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "post_id")
	private Post post;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	public void setMember(Member member) {
		this.member = member;
		if (!member.getLikeTableList().contains(this)) {
			member.getLikeTableList().add(this);
		}
	}

	public void setPost(Post post) {
		this.post = post;
		if (!post.getLikeList().contains(this)) {
			post.getLikeList().add(this);
		}
	}

	public void deleteLike() {
		Post post = this.getPost();
		if (post != null) {
			post.getLikeList().remove(this);
		}
		Member member = this.getMember();
		if (member != null) {
			member.getLikeTableList().remove(this);
		}
	}
}
