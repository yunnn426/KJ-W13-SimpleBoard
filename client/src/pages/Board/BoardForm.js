import React, { useState, useEffect, useContext } from 'react';
import { UrlContext } from '../../App';
import Cookies from 'js-cookie';
import CreateModal from '../../components/CreateModal';
import Pagination from './Pagination';
import Post from '../../components/Post';
import PostModal from '../../components/PostModal';
import SearchFilter from '../../components/SearchFilter';
import '../../styles/board.css';
import '../../styles/pagination.css';

const BoardForm = () => {
  const url = useContext(UrlContext);
  const token = Cookies.get('accessToken');

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [sort, setSort] = useState('DESC');
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState(null);
  const [writer, setWriter] = useState(null);

  // 게시글 불러오기
  const fetchBoard = async () => {
    const queryParams = {
      page: page,
      size: size,
      sort: sort,
      content: content,
      title: title,
      writer: writer,
      sortField: 'createdDate',
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
        console.log()
        const data = await response.json();
        // console.log(data);
        const p = data._embedded.responsePagePostDtoList;
        setTotalPages(data.page.totalPages);
        setPosts(p);
      } else {
        const errorData = await response.json();
        setPosts([]);
        alert(`Board fetch failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error fetching board:', error);
      setPosts([]);
      // alert('An error occured while fetching board.');
    }
  };

  useEffect(() => {
    fetchBoard();
  }, [page, size, sort, content, title, writer]);

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
    fetchBoard();
  };

  const handleDeleteSuccess = () => {
    fetchBoard();
  };

  /* 검색 필터 */
  const handleSearch = async (category, searchKey) => {
    setTitle('');
    setContent('');
    setWriter('');
    if (category == '제목') setTitle(searchKey);
    else if (category == '내용') setContent(searchKey);
    else if (category == '글쓴이') setWriter(searchKey);
    // fetchBoard();
  };

  return (
    <div>
      <div className="board-container">
        <div className="header">
          <SearchFilter onSearch={handleSearch} />
          <button className="button" onClick={openCreateModal}>
            글쓰기
          </button>
        </div>
        {posts.length > 0 && posts.map((post, postIdx) => <Post key={postIdx} value={post} onClick={() => viewPost(post.postId)} />)}
      </div>
      <CreateModal url={`${url}/board/create`} isOpen={isCreateModalOpen} onClose={closeCreateModal} onPostSuccess={handlePostSuccess} />
      {isPostModalOpen && (
        <PostModal isOpen={isPostModalOpen} onClose={closePostModal} onDeleteSuccess={handleDeleteSuccess} postId={selectedPost}></PostModal>
      )}
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default BoardForm;
