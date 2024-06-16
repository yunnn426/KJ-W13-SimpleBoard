import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../styles/navbar.css"; // 스타일 파일을 import

const Navbar = ({ nickname }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getCurrentPage = () => {
    switch (location.pathname) {
      case "/home":
        return "Home";
      case "/board":
        return "Board";
      case "/chat":
        return "Chat";
      default:
        return "";
    }
  };

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    navigate("/");
    window.location.reload();
  };

  const handleChat = () => {
    navigate("/chat");
  };

  const handleHome = () => {
    navigate("/home");
  };

  return (
    <nav className="navbar">
      <ul className="navbar-left">
        <li>
          <button className="home-button" onClick={handleHome}>
            Back
          </button>
        </li>
        <li>
          <button className="chat-button" onClick={handleChat}>
            Live-Chat
          </button>
        </li>
      </ul>
      <ul className="navbar-center">

        <li>{getCurrentPage()}</li>
      </ul>
      <ul className="navbar-right">
        <li>{nickname}</li>
        <li>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </li>

      </ul>
    </nav>
  );
};

export default Navbar;
