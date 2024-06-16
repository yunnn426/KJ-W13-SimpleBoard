import React, { useState, useContext, useEffect } from 'react';
import useGet from '../hooks/useGet';
import '../styles/modal.css';
import { UrlContext } from '../App';
import useDelete from '../hooks/useDelete';

const PostModal = ({ isOpen, onClose, onDeleteSuccess, postId }) => {
  const url = useContext(UrlContext);

  /* 글 GET */
  // 여기서 hook으로 받아오려 하니까 Promise Pending 문제 발생
  const getData = useGet(`${url}/board/posts/${postId}`);

  /* 글 DELETE */
  const { deleteData, data } = useDelete(`${url}/board/delete/${postId}`);
  const handleDelete = async () => {
    // 함수 안에서 훅을 바로 호출할 수 없다.
    // const deleteData = useDelete(`${url}/board/delete/${postId}`);

    const isSuccess = await deleteData();

    if (isSuccess) {
      onDeleteSuccess(data);
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
        </div>
      </div>
    </div>
  );
};

export default PostModal;
