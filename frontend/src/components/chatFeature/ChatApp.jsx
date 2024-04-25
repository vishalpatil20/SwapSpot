// ChatApp.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Function to fetch messages from the server
  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/messages');
      setMessages(response.data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Function to send a new message to the server
  const sendMessage = async () => {
    try {
      await axios.post('http://localhost:3000/messages', { text: newMessage });
      // After sending the message, fetch the updated message list
      fetchMessages();
      // Clear the input field
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Fetch messages on component mount
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="chat-app">
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <div className="sender">{message.sender}</div>
            <div className="text">{message.text}</div>
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatApp;
