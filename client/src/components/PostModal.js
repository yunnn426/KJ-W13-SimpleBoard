import React from 'react';
import '../styles/modal.css';

const PostModal = ({ isOpen, onClose, value }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{value.title}</h2>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <hr />
        <div className="modal-body">
          <div className="post-info">
            <span>작성자: {value.writer}</span>
            <span>작성시간: {value.createdDate}</span>
            <span>수정시간: {value.lastModifiedDate}</span>
          </div>
          <div className="post-content">
            <div>{value.content}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
