import React, { useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { UrlContext } from '../App';
import useDelete from '../hooks/useDelete';
import usePost from '../hooks/usePost';
import '../styles/modal.css';
import LikeList from './LikeList';
import Like from './Like';

const PostModal = ({ isOpen, onClose, onDeleteSuccess, postId }) => {
  const url = useContext(UrlContext);
  const token = Cookies.get('accessToken');

  /* 글 */
  const [getData, setGetData] = useState([]);

  /* 좋아요 */
  const [likeList, setLikeList] = useState([]);
  const [showLikeList, setShowLikeList] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

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
        setLikeList(jsonData.responsePostLikeDtoList);
        setLikeCount(jsonData.responsePostLikeDtoList.length);
      }
    } catch (error) {}
  };
  useEffect(() => {
    fetchPost();
  }, [url, token]);

  // console.log(getData);

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
          <span className="delete" onClick={handleDelete}>
            삭제
          </span>
          <div className="post-content">
            <div>{getData.content}</div>
          </div>
          <div className="like-list">
            <Like postId={postId} likeCount={likeCount} showLikeList={showLikeList} setShowLikeList={setShowLikeList} />
            <LikeList showLikeList={showLikeList} likeList={likeList} />
          </div>
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  );
};

export default PostModal;
