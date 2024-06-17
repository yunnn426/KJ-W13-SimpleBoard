import React from 'react';

const CommentList = ({ commentCount, commentList }) => {
  return (
    <div>
      <p>댓글: {commentCount}</p>
      <ul>
        {commentList.map((comment) => (
          <li key={comment.commentId}>
            <p>{comment.nickname}</p>
            {comment.comment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
