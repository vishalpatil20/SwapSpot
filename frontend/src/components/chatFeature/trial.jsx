import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

function SocketClient() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Establish Socket.IO connection
    const newSocket = io('http://localhost:3000'); // Replace with your server's URL

    newSocket.on('connect', () => {
      console.log('Socket.IO connection established');
    });

    newSocket.on('message', (data) => {
      console.log('Message received:', data);
      // You can update state or do something with the received message here
    });

    newSocket.on('disconnect', () => {
      console.log('Socket.IO connection closed');
    });

    setSocket(newSocket);

    // Clean up function to close Socket.IO connection when component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket && message) {
      socket.emit('sendMessage', message);
      setMessage('');
    }
  };

  return (
    <div>
      <h2>Socket.IO Client</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default SocketClient;
