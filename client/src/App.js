import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupPage from './pages/SignUp/SignupPage';
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Home/HomePage';
import BoardPage from './pages/Board/BoardPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/board" element={<BoardPage />} />
            </Routes>
        </Router>
    );
}

export default App;
