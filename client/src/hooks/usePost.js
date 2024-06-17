import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const usePost = (url, postBody) => {
  const token = Cookies.get('accessToken');
  const [data, setData] = useState([]);

  const postData = async () => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postBody),
    });
    setData(response);

    // return void인 경우
    if (response.ok) {
      return true;
    }
    if (!response.ok) {
      return false;
    }

    return data;
  };

  return { postData };
};

export default usePost;
