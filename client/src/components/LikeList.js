import React from 'react';

const LikeList = ({ showLikeList, likeList }) => {
  return (
    <ul style={{ display: showLikeList ? 'block' : 'none' }}>
      {likeList.map((member) => (
        <li key={member.id}>{member.memberNickname}</li>
      ))}
    </ul>
  );
};

export default LikeList;
