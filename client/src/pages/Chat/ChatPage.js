import React from "react";
import ChatForm from "./ChatForm";

const ChatPage = ({ nickname }) => {
    return (
        <div className="page-container">
            <ChatForm nickname={nickname} />
        </div>
    );
}

export default ChatPage;
