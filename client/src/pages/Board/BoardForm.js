import React, { useEffect } from 'react';

const BoardForm = () => {
    const [boards, setBoards] = useState([]);
    const [pages, setPages] = useState(1);
    const [size, setSize] = useState(5);
    const [sort, setSort] = useState("ASC");
    
    useEffect(() => {
      const fetchBoard = async () => {
        const queryParams = {
          pages : setPages,
          size : setSize,
          sort : setSort
        }
      }
    },[pages, size, sort]);

    return(
      <div className="board-container">
        
      </div>  
    )
}

export default BoardForm;