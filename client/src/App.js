import React, { useState, useEffect, createContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignupPage from "../src/pages/SignUp/SignupPage";
import LoginPage from "../src/pages/Login/LoginPage";
import HomePage from "../src/pages/Home/HomePage";
import BoardPage from "../src/pages/Board/BoardPage";
import Cookies from "js-cookie";
import Navbar from "./components/Navbar";
import ChatPage from "../src/pages/Chat/ChatPage";

export const UrlContext = createContext();

const decodeToken = (token) => {
  if (!token) {
    throw new Error('No token provided');
  }

  const base64Url = token.split('.')[1];
  if (!base64Url) {
    throw new Error('Invalid token');
  }

  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );

  return JSON.parse(jsonPayload);
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickname, setNickname] = useState("");
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      try {
        setIsLoggedIn(true);
        const decodedToken = decodeToken(token);
        setNickname(decodedToken.nickname);
      } catch (error) {
        console.error('Error decoding token:', error);
        setIsLoggedIn(false);
        setNickname('');
      }
    }
  }, []);

  const handleShowChat = () => {
    setShowChat(true);
  };

  return (
    <UrlContext.Provider value="http://192.168.0.136:8080">
      <Router>
        {isLoggedIn && (
          <Navbar nickname={nickname} onChatClick={handleShowChat} />
        )}
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/home" />
              ) : (
                <LoginPage setIsLoggedIn={setIsLoggedIn} setNickname={setNickname} />
              )
            }
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/home"
            element={isLoggedIn ? <HomePage /> : <Navigate to="/" />}
          />
          <Route
            path="/board"
            element={isLoggedIn ? <BoardPage /> : <Navigate to="/" />}
          />
          <Route
            path="/chat"
            element={
              isLoggedIn ? (
                <ChatPage nickname={nickname} />
              ) : (
                <Navigate to="/" />
              )
            }
          />

        </Routes>
      </Router>
    </UrlContext.Provider>
  );
};

export default App;
