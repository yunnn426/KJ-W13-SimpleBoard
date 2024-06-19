import React, { useState } from 'react';

const SortBy = ({ onSort }) => {
  const [standard, setStandard] = useState('최신순');

  const handleDesc = () => {
    setStandard('최신순');
    onSort('DESC');
  };

  const handleAsc = () => {
    setStandard('오래된순');
    onSort('ASC');
  };

  return (
    <div className="dropdown">
      <div className="searchby">
        <button className="dropbtn">
          <div className="dropdown-content">
            <a onClick={handleDesc}>최신순</a>
            <a onClick={handleAsc}>오래된순</a>
          </div>
          <i className="fas fa-caret-down dropdown-icon"></i>
          &nbsp;{standard}
        </button>
      </div>
    </div>
  );
};

export default SortBy;
