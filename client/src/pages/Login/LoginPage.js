import React from 'react';
import LoginForm from '../Login/LoginForm';

const LoginPage = ({ setIsLoggedIn, setNickname }) => {
    return (
        <div>
            <h2>Login Page</h2>
            <LoginForm setIsLoggedIn={setIsLoggedIn} setNickname={setNickname} />
        </div>
    );
}

export default LoginPage;
