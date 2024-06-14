import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import JSConfetti from 'js-confetti';
import '../../styles/signup.css'; 

const jsConfetti = new JSConfetti(); // JSConfetti 인스턴스를 컴포넌트 외부에서 생성

const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        nickname: ''
    });

    const [showConfetti, setShowConfetti] = useState(false); 
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://192.168.0.95:8090/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Signup Successful:', data);
                setShowConfetti(true);
                setTimeout(() => {
                    setShowConfetti(false);
                    navigate('/');  // 회원가입 성공 시 홈페이지로 이동
                }, 3000);
            } else {
                const errorData = await response.json();
                alert(`Signup failed: ${errorData.message}`);
                jsConfetti.addConfetti({
                    emojis: ["❤️‍🩹", "🥹", "❌"],
                    emojiSize: 100,
                    confettiNumber: 30,
                });
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Signup failed due to network error.');
            jsConfetti.addConfetti({
                emojis: ["❤️‍🩹", "🥹", "❌"],
                emojiSize: 100,
                confettiNumber: 30,
            });
        }
        console.log('Form submitted:', formData);
    };

    return (
        <div className="signup-container">
            <h2>Sign up</h2>
            {showConfetti && <Confetti />} {/* 폭죽 효과 컴포넌트 */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input type="text" name="nickname" id="nickname" value={formData.nickname} onChange={handleChange} required />

                <label htmlFor="id">Id:</label>
                <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
                
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupForm;
