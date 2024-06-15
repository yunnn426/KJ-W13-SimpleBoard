import React, { useState, useEffect,createContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignupPage from '../src/pages/SignUp/SignupPage';
import LoginPage from '../src/pages/Login/LoginPage';
import HomePage from '../src/pages/Home/HomePage';
import BoardPage from '../src/pages/Board/BoardPage';
import Cookies from 'js-cookie';
import Navbar from '../src/components/navbar';
// import {jwtDecode} from 'jwt-decode';

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

const  App = () => {
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [nickname, setNickname] = useState('');
    console.log(setNickname);
    useEffect(() => {
        const token = Cookies.get('accessToken');
        if (token) {
            try {
                setIsLoggedIn(true);
                const decodedToken = decodeToken(token);
                console.log(decodedToken.nickname);
                setNickname(decodedToken.nickname);
            } catch (error) {
                console.error('Error decoding token:', error);
                setIsLoggedIn(false);
                setNickname('');
            }
        }
    },[])

    return (
        <UrlContext.Provider value='http://192.168.0.95:8090'>
        <Router>
            {isLoggedIn && <Navbar nickname={nickname} />}
            <Routes>
                <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <LoginPage setIsLoggedIn={setIsLoggedIn} setNickname={setNickname} />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/" />} />
                <Route path="/dashboard" element={isLoggedIn ? <BoardPage /> : <Navigate to="/" />} />
            </Routes>
        </Router>
        </UrlContext.Provider>
    );
}

export default App;
