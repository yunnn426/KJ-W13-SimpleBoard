import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const useGet = (url) => {
  const token = Cookies.get('accessToken');
  const [data, setData] = useState([]);

  // hook에서 json으로 변환한 후 반환하도록 처리
  const getData = async () => {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    const jsonData = await response.json();
    setData(jsonData);
  };

  // useEffect를 쓰는 이유: 데이터를 한 번만 가져오기 위해
  useEffect(() => {
    getData();
  }, [url, token]);

  return data;
};

export default useGet;
