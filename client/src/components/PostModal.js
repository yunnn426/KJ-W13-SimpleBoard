import React, { useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { UrlContext } from '../App';
import useDelete from '../hooks/useDelete';
import usePost from '../hooks/usePost';
import Like from './Like';
import LikeList from './LikeList';
import Comment from './Comment';
import CommentList from './CommentList';
import '../styles/modal.css';

const PostModal = ({ isOpen, onClose, onDeleteSuccess, postId }) => {
  const url = useContext(UrlContext);
  const token = Cookies.get('accessToken');

  /* 글 */
  const [getData, setGetData] = useState([]);

  /* 좋아요 */
  const [likeList, setLikeList] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [showLikeList, setShowLikeList] = useState(false);

  /* 댓글 */
  const [commentList, setCommentList] = useState([]);
  const [commentCount, setCommentCount] = useState(0);

  // 여기서 hook으로 받아오려 하니까 Promise Pending 문제 발생
  const fetchPost = async () => {
    try {
      const response = await fetch(`${url}/board/posts/${postId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const jsonData = await response.json();
        setGetData(jsonData);

        // 좋아요 관련 상태값 변경
        setLikeList(jsonData.responsePostLikeDtoList);
        setLikeCount(jsonData.responsePostLikeDtoList.length);
        // 댓글 관련 상태값 변경
        setCommentList(jsonData.responsePostCommentDtoList);
        setCommentCount(jsonData.responsePostCommentDtoList.length);
        // console.log(commentList);
        // console.log(commentCount);
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.error('Error fetching post: ', error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [url, token, likeCount]);

  /* 글 DELETE */
  const { deleteData, responseDeleteData } = useDelete(`${url}/board/delete/${postId}`);
  const handleDelete = async () => {
    // 함수 안에서 훅을 바로 호출할 수 없다.
    // const deleteData = useDelete(`${url}/board/delete/${postId}`);

    const isSuccess = await deleteData();

    if (isSuccess) {
      onDeleteSuccess(responseDeleteData);
      onClose();
    } else {
      alert('자신이 작성한 글만 지울 수 있습니다.');
    }
  };

  /* 댓글 등록 */
  const handleCommentSuccess = () => {
    fetchPost();
  };

  /* 좋아요 눌리면 좋아요 리스트 다시 호출 */
  const handleLikeSuccess = () => {
    fetchPost();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{getData.title}</h2>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <hr />
        <div className="modal-body">
          <div className="post-info">
            <span>작성자: {getData.writer}</span>
            <span>작성시간: {getData.createdDate}</span>
            <span>수정시간: {getData.lastModifiedDate}</span>
          </div>
          <hr />
          <div className="post-content">
            <div>{getData.content}</div>
            <span className="delete" onClick={handleDelete}>
              삭제
            </span>
          </div>
          <div className="like-list">
            <Like postId={postId} likeCount={likeCount} showLikeList={showLikeList} setShowLikeList={setShowLikeList} onLikeSuccess={handleLikeSuccess}/>
            <LikeList showLikeList={showLikeList} likeList={likeList} />
          </div>
          <div className="comment-section">
            <div className="comment-list">
              <CommentList commentCount={commentCount} commentList={commentList} />
              <Comment postId={postId} onCommentSuccess={handleCommentSuccess} />
            </div>
          </div>
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  );
};

export default PostModal;
