package com.example.demo.board.entity;

import java.util.ArrayList;
import java.util.List;

import com.example.demo.board.dto.UpdatePostDto;
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
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Post extends BaseTimeEntity {

	@Id
	@Column(name = "post_id")
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Long postId;

	private String title;
	private String content;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member writer;

	@OneToMany(mappedBy = "post")
	@Builder.Default
	private List<Comment> commentList = new ArrayList<>();

	@OneToMany(mappedBy = "post")
	@Builder.Default
	private List<LikeTable> likeList = new ArrayList<>();

	public void updateBoard(UpdatePostDto updatePostDto) {
		if (updatePostDto.getTitle() == null || updatePostDto.getTitle().isEmpty()) {
			throw new IllegalArgumentException("Title cannot be null or empty");
		}
		if (updatePostDto.getContent() == null || updatePostDto.getContent().isEmpty()) {
			throw new IllegalArgumentException("Content cannot be null or empty");
		}
		this.title = updatePostDto.getTitle();
		this.content = updatePostDto.getContent();
	}
}
