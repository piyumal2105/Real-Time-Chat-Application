// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5001");

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });
  }, []);

  const handleSend = () => {
    if (message.trim()) {
      const user = JSON.parse(localStorage.getItem("user"));
      const newMessage = { sender: user.username, content: message };
      socket.emit("sendMessage", newMessage);
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}: </strong>
            {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chat;
