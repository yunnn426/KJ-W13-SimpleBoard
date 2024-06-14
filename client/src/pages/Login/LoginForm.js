import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import JSConfetti from "js-confetti";
import Cookies from 'js-cookie';
import '../../styles/login.css';  // 스타일 파일을 import

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    // 폭죽 효과를 제어하는 상태 추가
    const [showConfetti, setShowConfetti] = useState(false); 
    // useNavigate 훅을 사용하여 네비게이션 설정
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    
    //HTML Canvas 요소를 생성하여 페이지에 추가
    const jsConfetti = new JSConfetti(); 

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

                console.log('Login Successful:', data);

                setShowConfetti(true);
                setTimeout(() => {
                    setShowConfetti(false);
                    navigate('/home');  // 로그인 성공 시 홈페이지로 이동
                }, 3000);
            } else {
                const errorData = await response.json();
                alert(`Login failed: ${errorData.s}`);
                jsConfetti.addConfetti({
                    emojis: ["❤️‍🩹", "🥹", "❌"],
                    emojiSize: 100,
                    confettiNumber: 30,
                });
            }
        } catch (error) {
            console.error('Error:', error);
        }
        console.log('Form submitted:', formData);
    };

    const handleSignupClick = () => {
        navigate('/signup'); // 회원가입 페이지로 이동
    };

    return (
        <div className="login-container">
            {showConfetti && <Confetti />} {/* 폭죽 효과 컴포넌트 */}
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">ID:</label>
                <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
                
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                
                <button type="submit" >Login</button>
            </form>
            <button onClick={handleSignupClick} className="signup-button">Sign Up</button> {/* 회원가입 버튼 추가 */}
        </div>
    );
};

export default LoginForm;