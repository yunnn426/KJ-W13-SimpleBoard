import React from "react";
import '../../styles/home.css'; 
import { useNavigate } from "react-router-dom";

const HomeForm = () => {
    const navigate = useNavigate();

    const handleGameClick = () => {
        navigate('/game');
    }

    const handleDashboardClick = () => {
        navigate('/dashboard');
    }

    return (
        <div className="home-container">
            <button onClick={handleGameClick}>끝말 잇기</button> 
            <button onClick={handleDashboardClick}>게시판</button> 
        </div>
    )
};

export default HomeForm;