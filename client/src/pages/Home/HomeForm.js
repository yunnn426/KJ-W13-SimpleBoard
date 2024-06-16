import React from "react";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

const HomeForm = () => {
  const navigate = useNavigate();

  const handleGameClick = () => {
    navigate("/chat");
  };

  const handleBoardClick = () => {
    navigate("/board");
  };

  return (
    <div className="home-container">
      <button onClick={handleGameClick}>포켓몬</button>
      <button onClick={handleBoardClick}>게시판</button>
    </div>
  );
};

export default HomeForm;
