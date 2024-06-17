import React from 'react';

const LikeList = ({ showLikeList, likeList }) => {
  return (
    <ul style={{ display: showLikeList ? 'block' : 'none' }}>
      {likeList.map((member, memberIndex) => (
        <li key={memberIndex}>{member.memberNickname}</li>
      ))}
    </ul>
  );
};

export default LikeList;
