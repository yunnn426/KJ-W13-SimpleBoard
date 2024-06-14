import React from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/home.css'; 

const HomeForm = () => {
    const navigate = useNavigate();
    const title = "Welcome!";

    const handleGameClick = () => {
        navigate('/game');
    }

    const handleBoardClick = () => {
        navigate('/board');
    }

    return (
        <div>
            <div className="home-container">
                <button onClick={handleGameClick}>끝말 잇기</button> 
                <button onClick={handleBoardClick}>게시판</button> 
            </div>
        </div>
    )
};

export default HomeForm;