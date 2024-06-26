import React, { useState } from 'react';
import usePost from '../hooks/usePost';
import '../styles/modal.css';

const CreateModal = ({ url, isOpen, onClose, onPostSuccess }) => {
  const [formData, setFormData] = useState({
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

  const { postData, responsePostData } = usePost(url, formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await postData();

    if (success) {
      onPostSuccess(); // 성공 시 부모 컴포넌트에 알림
      onClose();
    } else {
      alert(`Submit post failed.`);
    }

    setFormData({
      title: '',
      content: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>글쓰기</h2>
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

export default CreateModal;
