import React, { useState, useContext } from 'react';
import { UrlContext } from '../App';
import usePost from '../hooks/usePost';
import '../styles/like.css';

const Like = ({ postId, likeCount, showLikeList, setShowLikeList }) => {
  const url = useContext(UrlContext);
  const [liked, setLiked] = useState(false);

  const postBody = {
    postId: postId,
  };
  const { postData } = usePost(`${url}/board/reaction/like`, postBody);
  const handleLike = async () => {
    const response = await postData();

    if (response.ok) {
      setLiked(!liked);
      // console.log('OK');
    } else {
      // console.log('NOT OK');
    }
  };

  /* 좋아요 리스트 */
  const handleLikeList = () => {
    setShowLikeList(!showLikeList);
  };

  return (
    <span className={liked ? 'like-button liked' : 'like-button'}>
      <i className="fas fa-heart" onClick={handleLike}></i>
      <span className="like-count" onClick={handleLikeList}>
        {likeCount}
      </span>
    </span>
  );
};

export default Like;
