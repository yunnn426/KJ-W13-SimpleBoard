import React, { useEffect, useState } from 'react';
import '../styles/dropdown.css';

const SearchFilter = ({ onSearch }) => {
  const [category, setCategory] = useState('제목');
  const [searchKey, setSearchKey] = useState('');

  // 인풋이 바뀔 때마다 부모 컴포넌트로 작성한 내용과 기준 전달
  const handleChange = (e) => {
    setSearchKey(e.target.value);
  };

  const handleSearch = () => {
    onSearch(category, searchKey);
  };

  const handleTitle = () => {
    setCategory('제목');
  };

  const handleContent = () => {
    setCategory('내용');
  };

  const handleWriter = () => {
    setCategory('글쓴이');
  };

  return (
    <div className="dropdown">
      <div className="searchby">
        <button className="dropbtn">
          <div className="dropdown-content">
            <a onClick={handleTitle}>제목</a>
            <a onClick={handleContent}>내용</a>
            <a onClick={handleWriter}>글쓴이</a>
          </div>
          <i className="fas fa-caret-down dropdown-icon"></i>
          &nbsp;{category}
        </button>
        <input className="keyword" type="text" placeholder="Keyword..." onChange={handleChange}></input>
        <button className="searchbtn" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
