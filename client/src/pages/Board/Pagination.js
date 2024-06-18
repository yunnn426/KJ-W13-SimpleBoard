import React from 'react';
import '../../styles/pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    // console.log(currentPage, totalPages);

    const goToPrevPage = () => {
        if (currentPage > 0)
            onPageChange(currentPage - 1);
    }

    const goToNextPage = () => {
        if (currentPage < totalPages - 1)
            onPageChange(currentPage + 1);
    }

    return (
        <div className='pagination'>
            <button className='active' onClick={goToPrevPage} disabled={currentPage === 0}>
                이전
            </button>
            <button className='disabled' onClick={goToNextPage} disabled={currentPage === totalPages - 1}>
                다음
            </button>
        </div>
    )
};

export default Pagination;
