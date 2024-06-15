import React, { useState, useContext } from "react";
import Cookies from 'js-cookie';
import { UrlContext } from "../App";
import '../styles/modal.css';

const ModalForm = ({ isOpen, onClose }) => {
    const url = useContext(UrlContext);
    const token = Cookies.get('accessToken');

    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData, 
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${url}/board/create`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
            });
            
            if (response.ok) {
              const data = await response.json();
    
              console.log(data.status);
              onClose();
            } else {
              const errorData = await response.json();
              alert(`Submit post failed: ${errorData.message}`);
            }
          } catch (error) {
            console.error('Error:', error);
            console.log(token);
            alert('An error occurred while posting. Please try again.');
          }

          console.log('Title:', formData.title);
        console.log('Content:', formData.content);
    }

    if (!isOpen)
        return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>글쓰기</h2>
                    <span className="close" onClick={onClose}>&times;</span>
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
                    <button type="submit" className="modal-button">저장</button>
                </form>
            </div>
        </div>
    );
}
export default ModalForm;