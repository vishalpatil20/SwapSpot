import React, { useState, useEffect } from 'react';
import SimplePeer from 'simple-peer';
import io from 'socket.io-client';
import VideoChatComponent from './VideoChatComponent'; // Adjust the path as per your project structure

const socket = io('http://localhost:3000');

function SwapCallFeature() {
  const [peers, setPeers] = useState([]);
  const [roomId, setRoomId] = useState('');
  const [inRoom, setInRoom] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [isInitiator, setIsInitiator] = useState(false);
  const [videoDevices, setVideoDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');

  useEffect(() => {
    socket.on('offer', ({ offer, from }) => {
      console.log('Received offer:', offer);
      if (!isInitiator) {
        const peer = new SimplePeer({ initiator: false, trickle: false, stream: localStream });
        peer.signal(offer);
        peer.on('signal', answer => {
          console.log('Sending answer:', answer);
          socket.emit('answer', { room: roomId, answer, to: from });
        });
        peer.on('stream', stream => {
          console.log('Received remote stream');
          setRemoteStreams(prevStreams => [...prevStreams, stream]);
        });
        setPeers(prevPeers => [...prevPeers, { peer, id: from }]);
      }
    });

    socket.on('answer', ({ answer, from }) => {
      console.log('Received answer:', answer);
      const peerObj = peers.find(p => p.id === from);
      if (peerObj) {
        peerObj.peer.signal(answer);
      }
    });

    socket.on('candidate', ({ candidate, from }) => {
      console.log('Received candidate:', candidate);
      const peerObj = peers.find(p => p.id === from);
      if (peerObj) {
        peerObj.peer.signal(candidate);
      }
    });

    socket.on('new-participant', ({ id }) => {
      console.log('New participant joined:', id);
      if (isInitiator) {
        const peer = new SimplePeer({ initiator: true, trickle: false, stream: localStream });
        peer.on('signal', data => {
          if (data.type === 'offer') {
            console.log('Sending offer:', data);
            socket.emit('offer', { room: roomId, offer: data, to: id });
          } else if (data.type === 'answer') {
            console.log('Sending answer:', data);
            socket.emit('answer', { room: roomId, answer: data, to: id });
          } else {
            console.log('Sending candidate:', data);
            socket.emit('candidate', { room: roomId, candidate: data, to: id });
          }
        });
        peer.on('stream', stream => {
          console.log('Received remote stream');
          setRemoteStreams(prevStreams => [...prevStreams, stream]);
        });
        setPeers(prevPeers => [...prevPeers, { peer, id }]);
      }
    });

    return () => {
      socket.off('offer');
      socket.off('answer');
      socket.off('candidate');
      socket.off('new-participant');
    };
  }, [peers, isInitiator, roomId, localStream]);

  useEffect(() => {
    async function getVideoDevices() {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setVideoDevices(videoDevices);
    }
    getVideoDevices();
  }, []);

  const handleDeviceChange = (event) => {
    setSelectedDeviceId(event.target.value);
  };

  const createRoom = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: { deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined }, 
      audio: true 
    });
    setLocalStream(stream);
    socket.emit('create', { room: roomId });
    setIsInitiator(true);
    setInRoom(true);
  };

  const joinRoom = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      video: { deviceId: selectedDeviceId ? { exact: selectedDeviceId } : undefined }, 
      audio: true 
    });
    setLocalStream(stream);
    socket.emit('join', { room: roomId });
    setIsInitiator(false);
    setInRoom(true);
  };

  const endCall = () => {
    peers.forEach(({ peer }) => peer.destroy());
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    socket.emit('leave', { room: roomId });
    setPeers([]);
    setLocalStream(null);
    setRemoteStreams([]);
    setInRoom(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-8xl text-prim mb-8">Welcome to SwapCall</h1>
      {!inRoom ? (
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="p-2 mb-4 bg-gray-800 text-white rounded"
            placeholder="Enter Room ID"
          />
          <select onChange={handleDeviceChange} value={selectedDeviceId} className="p-2 mb-4 bg-gray-800 text-white rounded">
            <option value="">Select Camera</option>
            {videoDevices.map(device => (
              <option key={device.deviceId} value={device.deviceId}>{device.label || `Camera ${device.deviceId}`}</option>
            ))}
          </select>
          <div className="flex space-x-4">
            <button
              onClick={createRoom}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-800 transition"
            >
              Create Room
            </button>
            <button
              onClick={joinRoom}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-800 transition"
            >
              Join Room
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <VideoChatComponent localStream={localStream} remoteStreams={remoteStreams} />
          <button
            onClick={endCall}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-800 transition"
          >
            End Call
          </button>
        </div>
      )}
    </div>
  );
}

export default SwapCallFeature;
