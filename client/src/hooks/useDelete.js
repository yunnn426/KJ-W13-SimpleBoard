import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const useDelete = (url) => {
  const token = Cookies.get('accessToken');
  const [data, setData] = useState([]);

  const deleteData = async () => {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    // DELETE 요청은 202 No Content 상태 코드를 반환한다.
    if (response.status == 202) {
      setData({ success: true });
      return true;
    } else {
      setData({ success: false });
      return false;
    }
  };
  return { deleteData, data };
};

export default useDelete;
