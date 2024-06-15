import React, { useState, useEffect, useContext } from "react";
import { UrlContext } from "../../App";
import Cookies from "js-cookie";
import ModalForm from "../../components/ModalForm";
import "../../styles/board.css";
import Pagination from "./Pagination";
import "../../styles/pagination.css";

const BoardForm = () => {
  const url = useContext(UrlContext);
  const token = Cookies.get("accessToken");

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sort, setSort] = useState("DESC");
  const [totalItems, setTotalItems] = useState(15);
  const [totalPages, setTotalPages] = useState(Math.ceil(totalItems / size));

  // 게시글 불러오기
  const fetchBoard = async () => {
    const queryParams = {
      page,
      size,
      sort,
    };

    try {
      const response = await fetch(`${url}/board/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(queryParams),
      });

      if (response.ok) {
        const data = await response.json();
        const p = data._embedded.responsePagePostDtoList;
        setTotalItems(data.totalItems);
        setTotalPages(Math.ceil(data.totalItems / size));
        setPosts(p);
      } else {
        const errorData = await response.json();
        alert(`Board fetch failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error fetching board:", error);
      alert("An error occured while fetching board.");
    }
  };

  useEffect(() => {
    fetchBoard();
  }, [page, size, sort]);

  // 글쓰기용 모달창
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePostSuccess = () => {
    fetchBoard(); 
  };

  return (
    <div>
      <div className="board-container">
        <button className="button" onClick={openModal}>
          글쓰기
        </button>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.writer}</p>
          </div>
        ))}
      </div>
      <ModalForm isOpen={isModalOpen} onClose={closeModal} onPostSuccess={handlePostSuccess} />
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default BoardForm;
