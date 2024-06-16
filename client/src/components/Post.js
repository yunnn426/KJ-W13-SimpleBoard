import React from 'react';
import '../styles/post.css';

const Post = ({ value, onClick }) => {
  return (
    <div className="post-container" onClick={() => onClick(value)}>
      <div>
        <div>
          <b>{value.title}</b> | {value.writer}
        </div>
        <p>{value.createdDate}</p>
      </div>
    </div>
  );
};

export default Post;
