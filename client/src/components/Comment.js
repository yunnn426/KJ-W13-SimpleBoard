import React, { useState, useContext } from 'react';
import { UrlContext } from '../App';
import usePost from '../hooks/usePost';
import '../styles/comment.css';

const Comment = ({ postId, onCommentSuccess }) => {
  const url = useContext(UrlContext);
  const [comment, setComment] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComment(value);
  };

  const postBody = {
    postId: postId,
    comment: comment,
  };
  const { postData } = usePost(`${url}/board/reaction/comment`, postBody);

  const handleComment = async (e) => {
    e.preventDefault(); // 폼을 제출할 때 페이지가 새로 고침되는 것 방지
    const success = await postData(); // await 표시해주어야 비동기 작업이 끝날 때까지 기다림

    if (success) {
      // console.log('OK');
      setComment('');
      onCommentSuccess();
    } else {
      // console.log('NO');
      setComment('');
    }
  };

  return (
    <form className="comment-form" onSubmit={handleComment}>
      <input type="text" name="comment" id="comment" value={comment} onChange={handleChange} required />
      <button type="submit">등록</button>
    </form>
  );
};

export default Comment;
