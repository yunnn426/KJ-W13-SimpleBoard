import React, { useState, useContext } from 'react';
import usePatch from '../hooks/usePatch';
import { UrlContext } from '../App';
import '../styles/modal.css';

const UpdateModal = ({ postId, isOpen, onClose, onUpdateSuccess }) => {
  const url = useContext(UrlContext);
  const [formData, setFormData] = useState({
    id: postId,
    title: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { patchData, responsePatchData } = usePatch(`${url}/board/update`, formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await patchData();

    if (success) {
      onUpdateSuccess();
      onClose();
    } else {
      alert('자신이 작성한 글만 수정할 수 있습니다.');
    }

    setFormData({
      id: null,
      title: '',
      content: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>글 수정</h2>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="modal-input"
            name="title"
            placeholder="제목"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <textarea
            className="modal-input"
            name="content"
            placeholder="내용"
            id="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
          <button type="submit" className="modal-button">
            저장
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateModal;
