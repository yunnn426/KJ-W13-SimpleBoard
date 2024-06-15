import React, { useState, useEffect, useContext } from 'react';
import { UrlContext } from '../../App';
import Cookies from 'js-cookie';
import ModalForm from '../../components/ModalForm';
import '../../styles/board.css';

const BoardForm = () => {
    const url = useContext(UrlContext);
    const token = Cookies.get('accessToken');

    const [boards, setBoards] = useState([]);
    const [pages, setPages] = useState(1);
    const [size, setSize] = useState(5);
    const [sort, setSort] = useState("DESC");

    // 게시글 불러오기
    const fetchBoard = async () => {
      const queryParams = {
        pages : 1,
        size : 5,
        sort : "DESC"
      }

      try {
        const response = await fetch(`${url}/board/posts`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(queryParams)
        });

        if (response.ok) {
          const data = await response.json();
          
          // 응답 통째로 출력
          console.log(data);
        } else {
          const errorData = await response.json();
          alert(`Board fetch failed: ${errorData.message}`);
        }
      } catch (error) {
        console.error('Error fetching board:', error);
        alert('An error occured while fetching board.');
      }
    }

    useEffect(() => {
      fetchBoard();
    },[pages, size, sort]);

    // 글쓰기용 모달창
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    return(
      <div>
        <div className="board-container">
          <button className="button" onClick={openModal}>글쓰기</button>
        </div>  
        
        <ModalForm isOpen={isModalOpen} onClose={closeModal} />
      </div>
    );
}

export default BoardForm;