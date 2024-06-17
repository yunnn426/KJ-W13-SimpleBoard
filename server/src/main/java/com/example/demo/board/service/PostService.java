package com.example.demo.board.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.board.dto.CreateCommentOrLikeDto;
import com.example.demo.board.dto.CreatePostDto;
import com.example.demo.board.dto.PostPagingDto;
import com.example.demo.board.dto.ResponsePagePostDto;
import com.example.demo.board.dto.ResponsePostDto;
import com.example.demo.board.dto.UpdatePostDto;
import com.example.demo.board.entity.Comment;
import com.example.demo.board.entity.LikeTable;
import com.example.demo.board.entity.Post;
import com.example.demo.board.repository.JpaRepository.CommentJpaRepository;
import com.example.demo.board.repository.JpaRepository.LikeJpaRepository;
import com.example.demo.board.repository.PostRepository;
import com.example.demo.member.entity.Member;
import com.example.demo.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PostService {

	private final PostRepository postRepository;
	private final MemberRepository memberRepository;
	private final LikeJpaRepository likeJpaRepository;
	private final CommentJpaRepository commentJpaRepository;

	@Transactional
	public CreatePostDto createPost(CreatePostDto createPostDto, String username) {
		Member member = memberRepository.findByUsername(username)
			.orElseThrow(() -> new IllegalArgumentException("Username : " + username + " not found"));
		Post post = createPostDto.toEntity(member);
		postRepository.save(post);
		return createPostDto;
	}

	@Transactional
	public UpdatePostDto updatePost(UpdatePostDto boardUpdateDto, String username) {
		Post post = postRepository.findById(boardUpdateDto.getId())
			.orElseThrow(() -> new IllegalArgumentException("Board : " + boardUpdateDto.getId() + " not found"));
		if (post.getWriter().getUsername().equals(username)) {
			post.updateBoard(boardUpdateDto);
			return boardUpdateDto;
		} else {
			throw new IllegalArgumentException("Invalid Request");
		}
	}

	@Transactional
	public void deletePost(Long boardId, String username) {
		Post post = postRepository.findByIdWithWriter(boardId)
			.orElseThrow(() -> new IllegalArgumentException("Board : " + boardId + " not found"));

		if (post.getWriter().getUsername().equals(username)) {
			postRepository.delete(post);
		} else {
			throw new IllegalArgumentException("Invalid Request");
		}


	}

	public Page<ResponsePagePostDto> findAllPost(PostPagingDto postPagingDto) {
		Sort sort = Sort.by(Sort.Direction.fromString(postPagingDto.getSort()), "postId");
		Pageable pageable = PageRequest.of(postPagingDto.getPage(), postPagingDto.getSize(), sort);
		Page<Post> posts = postRepository.findAll(pageable);
		return posts.map(ResponsePagePostDto::toDto);
	}

	public ResponsePostDto getPostById(Long postId) {
		List<Comment> commentList = commentJpaRepository.findAllByPostId(postId);
		List<LikeTable> likeList = likeJpaRepository.findAllByPostId(postId);
		Post post = postRepository.findByIdWithWriter(postId)
			.orElseThrow(() -> new IllegalArgumentException("Post : " + postId + " not found"));
		return ResponsePostDto.toDto(post, commentList, likeList);
	}

	@Transactional
	public void createOrDeleteLike(CreateCommentOrLikeDto createCommentOrLikeDto, String username) {
		if (postRepository.existsLikeWithUsername(createCommentOrLikeDto.getPostId(), username)) {
			LikeTable likeTable = likeJpaRepository.findByUsername(createCommentOrLikeDto.getPostId(), username)
				.orElseThrow(() -> new IllegalArgumentException("Like not found"));
			likeTable.deleteLike();
			likeJpaRepository.delete(likeTable);
			return;
		}
		Member member = memberRepository.findByUsername(username)
			.orElseThrow(() -> new IllegalArgumentException("Username : " + username + " not found"));
		Post post = postRepository.findByIdWithCommentList(createCommentOrLikeDto.getPostId())
			.orElseThrow(() -> new IllegalArgumentException("PostId : " + createCommentOrLikeDto.getPostId() + " not found"));

		LikeTable like = CreateCommentOrLikeDto.toLikeEntity(createCommentOrLikeDto, member, post);
		likeJpaRepository.save(like);
	}

	@Transactional
	public void createComment(CreateCommentOrLikeDto createCommentOrLikeDto, String username) {
		Member member = memberRepository.findByUsername(username)
			.orElseThrow(() -> new IllegalArgumentException("Username : " + username + " not found"));
		Post post = postRepository.findByIdWithCommentList(createCommentOrLikeDto.getPostId())
			.orElseThrow(() -> new IllegalArgumentException("PostId : " + createCommentOrLikeDto.getPostId() + " not found"));
		Comment comment = CreateCommentOrLikeDto.toCommentEntity(createCommentOrLikeDto, member, post);
		commentJpaRepository.save(comment);
	}

	@Transactional
	public void deleteComment(Long commentId) {
		Comment comment = commentJpaRepository.findByCommentId(commentId)
			.orElseThrow(() -> new IllegalArgumentException("Comment not found"));
		comment.deleteComment();
		commentJpaRepository.delete(comment);
	}

	@Transactional
	public void deleteLike(Long commentId) {
		LikeTable likeTable = likeJpaRepository.findByLikeId(commentId)
			.orElseThrow(() -> new IllegalArgumentException("Comment not found"));
		likeTable.deleteLike();
		likeJpaRepository.delete(likeTable);
	}
}
