import React, { useState, useContext } from 'react';
import useGet from '../hooks/useGet';
import '../styles/modal.css';
import { UrlContext } from '../App';

const PostModal = ({ isOpen, onClose, postId }) => {
  const url = useContext(UrlContext);
  // 여기서 hook으로 받아오려 하니까 Promise Pending 문제 발생
  const data = useGet(`${url}/board/posts/${postId}`);

  // console.log(data);
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{data.title}</h2>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <hr />
        <div className="modal-body">
          <div className="post-info">
            <span>작성자: {data.writer}</span>
            <span>작성시간: {data.createdDate}</span>
            <span>수정시간: {data.lastModifiedDate}</span>
          </div>
          <div className="post-content">
            <div>{data.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
