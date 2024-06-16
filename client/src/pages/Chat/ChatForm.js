import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "../../styles/chat.css";

// 서버의 IP 주소로 변경합니다.
const socket = io("http://192.168.0.113:8090");

const ChatForm = ({ nickname }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  console.log(nickname);
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const timestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const messageData = {
        nickname,
        message,
        timestamp,
      };
      socket.emit("message", messageData);
      setMessage("");
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            <div className="message-info">
              <span className="nickname">{msg.nickname} : </span>
              <div className="message-text">{msg.message}</div>
              <span className="timestamp">{msg.timestamp}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요"
        />
        <button type="submit">전송</button>
      </form>
    </div>
  );
};

export default ChatForm;
