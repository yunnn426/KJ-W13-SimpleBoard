import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
// import JSConfetti from "js-confetti";
import Cookies from 'js-cookie';
import '../../styles/login.css';
// import {jwtDecode} from 'jwt-decode';

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

const LoginForm = ({ setIsLoggedIn, setNickname }) => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [showConfetti, setShowConfetti] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://192.168.0.95:8090/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();

                // 서버로부터 받은 토큰을 쿠키에 저장
                Cookies.set('accessToken', data.accessToken, {expires : 1});
                Cookies.set('refreshToken', data.refreshToken, {expires : 1});

                // 토큰이 문자열인지 확인
                if (typeof data.token === 'string') {
                    try {
                        const decodedToken = decodeToken(data.accessToken);
                        console.log('Login Successful:', data);

                        setIsLoggedIn(true);
                        setNickname(decodedToken.nickname);

                        setShowConfetti(true);
                        setTimeout(() => {
                            setShowConfetti(false);
                            navigate('/home');  // 로그인 성공 시 홈페이지로 이동
                        }, 3000);
                    } catch (error) {
                        console.error('Error decoding token:', error);
                        alert('An error occurred while processing your login. Please try again.');
                    }
                } else {
                    console.error('Invalid token format received:', data.accessToken);
                    alert('Invalid token format received. Please try again.');
                }
            } else {
                const errorData = await response.json();
                alert(`Login failed: ${errorData.s}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while logging in. Please try again.');
        }
    };

    const handleSignupClick = () => {
        navigate('/signup');
    };

    return (
        <div className="login-container">
            {showConfetti && <Confetti />}
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">ID:</label>
                <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
                
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                
                <button type="submit">Login</button>
            </form>
            <button onClick={handleSignupClick} className="signup-button">Sign Up</button>
        </div>
    );
};

export default LoginForm;