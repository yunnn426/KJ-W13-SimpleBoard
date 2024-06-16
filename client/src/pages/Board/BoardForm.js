import React, { useState, useEffect, useContext } from "react";
import { UrlContext } from "../../App";
import Cookies from "js-cookie";
import ModalForm from "../../components/CreateModal";
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

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("title");

  const fetchBoard = async () => {
    const queryParams = {
      page,
      size,
      sort,
      searchQuery,
      filter
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

  const handleSearch = (e) => {
    e.preventDefault();
    fetchBoard();
  };

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
    <div className="page-container">
      <div className="board-header">
        <form onSubmit={handleSearch}>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="title">제목</option>
            <option value="writer">작성자</option>
          </select>
          <input
            type="text"
            placeholder="검색어를 입력해주세요."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">검색</button>
        </form>
      </div>
      <div className="board-container">
        <table className="board-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>이름</th>
              <th>아이디</th>
              <th>작성일</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr key={post.id}>
                <td>{totalItems - (page * size + index)}</td>
                <td>{post.title}</td>
                <td>{post.writer}</td>
                <td>{post.userId}</td>
                <td>{post.date}</td>
                <td>{post.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="board-actions">
          <button className="delete-button">삭제</button>
          <button className="create-button" onClick={openModal}>글쓰기</button>
        </div>
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
