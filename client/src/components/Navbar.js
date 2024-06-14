import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/navbar.css';  // 스타일 파일을 import

const Navbar = ({ nickname }) => {
    const location = useLocation();
    
    const getCurrentPage = () => {
        switch (location.pathname) {
            case '/home':
                return 'Home';
            case '/dashboard':
                return 'Board';
            default:
                return '';
        }
    };

    return (
        <nav className="navbar">
            <ul className="navbar-left">
                <li>{getCurrentPage()}</li>
            </ul>
            <ul className="navbar-right">
                <li>{nickname}</li>
            </ul>
        </nav>
    );
};

export default Navbar;
