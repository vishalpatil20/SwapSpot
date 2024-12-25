import React, { useState, useEffect } from 'react';
import { FiSend } from 'react-icons/fi'; // React Icons for Send button
import { FaRegUserCircle } from 'react-icons/fa'; // User icon for display

const ChatComponent = ({ roomId, socket }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Get the username from localStorage token
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
      setUsername(user.username || 'Anonymous');
    }

    // Listen for new messages
    socket.on('receive-message', ({ message, sender, timestamp }) => {
      if (!messages.some(msg => msg.message === message)) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { message, sender, timestamp },
        ]);
      }
    });

    // Notify about new participants
    socket.on('new-participant', ({ id }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: `User with ID ${id} joined the room`, sender: 'System', timestamp: new Date().toISOString() },
      ]);
    });

    return () => {
      socket.off('receive-message');
      socket.off('new-participant');
    };
  }, [socket, messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const timestamp = new Date().toISOString();
      socket.emit('send-message', {
        room: roomId,
        message: newMessage,
        sender: username,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: newMessage, sender: username, timestamp },
      ]);
      setNewMessage('');
    }
  };

  return (
    <div className="w-1/2 mt-10 h-full p-4 bg-gray-800 text-white rounded-lg overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-4 flex items-start space-x-2">
            <div>
              <strong className={msg.sender === 'System' ? 'text-yellow-500' : 'text-blue-400'}>
                {msg.sender === 'System' ? <FaRegUserCircle className="inline-block mr-2" /> : msg.sender}:
              </strong>
            </div>
            <div>
              {msg.message}
              <div className="text-sm text-gray-400">{new Date(msg.timestamp).toLocaleTimeString()}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center mt-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 rounded-l-lg bg-gray-700 text-white outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="p-2 bg-blue-600 rounded-r-lg hover:bg-blue-800 transition flex items-center justify-center"
        >
          <FiSend className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
