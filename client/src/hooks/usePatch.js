import React, { useState } from 'react';
import Cookies from 'js-cookie';

const usePatch = (url, postBody) => {
  const token = Cookies.get('accessToken');
  const [data, setData] = useState([]);

  const patchData = async () => {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postBody),
    });
    setData(response);

    if (response.ok) return true;
    else return false;
  };

  return { patchData };
};

export default usePatch;
