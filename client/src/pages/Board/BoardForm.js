import React, { useState, useEffect, useContext } from 'react';
import { UrlContext } from '../../App';
import Cookies from 'js-cookie';
import CreateModal from '../../components/CreateModal';
import Pagination from './Pagination';
import Post from '../../components/Post';
import '../../styles/board.css';
import '../../styles/pagination.css';
import PostModal from '../../components/PostModal';

const BoardForm = () => {
  const url = useContext(UrlContext);
  const token = Cookies.get('accessToken');

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sort, setSort] = useState('DESC');
  const [totalItems, setTotalItems] = useState(15);
  const [totalPages, setTotalPages] = useState(Math.ceil(totalItems / size));
  const [selectedPost, setSelectedPost] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("title");

  const fetchBoard = async () => {
    const queryParams = {
      page: 0,
      size: 5,
      sort: 'DESC',
    };

    try {
      const response = await fetch(`${url}/board/posts`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
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
      console.error('Error fetching board:', error);
      // alert('An error occured while fetching board.');
    }
  };

  useEffect(() => {
    fetchBoard();
  }, [page, size, sort]);


  const handlePostSuccess = () => {
    fetchBoard();
  };

  // 글쓰기용 모달창
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  // 게시글 한 개 보기
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const viewPost = (postId) => {
    setSelectedPost(postId);
    openPostModal();

  };

  const openPostModal = () => {
    setIsPostModalOpen(true);
  };

  const closePostModal = () => {
    setIsPostModalOpen(false);
  };

  const handleDeleteSuccess = () => {
    fetchBoard();
  }

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

        <button className="button" onClick={openCreateModal}>
          글쓰기
        </button>
        {posts.map((post) => (
          <Post key={post.id} value={post} onClick={() => viewPost(post.postId)} />
        ))}
      </div>
      <CreateModal isOpen={isCreateModalOpen} onClose={closeCreateModal} onPostSuccess={handlePostSuccess} />
      {isPostModalOpen && (
        <PostModal isOpen={isPostModalOpen} onClose={closePostModal} onDeleteSuccess={handleDeleteSuccess} postId={selectedPost}></PostModal>
      )}
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default BoardForm;
