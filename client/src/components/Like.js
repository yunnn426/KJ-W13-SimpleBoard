import React, { useState, useContext, useEffect } from 'react';
import { UrlContext } from '../App';
import usePost from '../hooks/usePost';
import '../styles/like.css';

const Like = ({ isLiked, postId, likeCount, showLikeList, setShowLikeList, onLikeSuccess }) => {
  const url = useContext(UrlContext);
  const [liked, setLiked] = useState(false);

  // 내가 이미 좋아요 누른 글이라면 토글 켜기
  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

  const postBody = {
    postId: postId,
  };
  const { postData } = usePost(`${url}/board/reaction/like`, postBody);
  const handleLike = async () => {
    const success = await postData();

    if (success) {
      setLiked(!liked);
      onLikeSuccess();
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
