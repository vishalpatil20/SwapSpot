import React, { useState, useEffect } from 'react';
import SimplePeer from 'simple-peer';
import io from 'socket.io-client';
import VideoChatComponent from './VideoChatComponent';
import ChatComponent from './ChatComponent';

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
    navigator.mediaDevices.enumerateDevices()
      .then(devices => setVideoDevices(devices.filter(device => device.kind === 'videoinput')))
      .catch(err => console.error('Error accessing devices:', err));

    socket.on('offer', ({ offer, from, room }) => handleOffer(offer, from, room));
    socket.on('answer', ({ answer, from, room }) => handleAnswer(answer, from, room));
    socket.on('candidate', ({ candidate, from, room }) => handleCandidate(candidate, from, room));
    socket.on('new-participant', ({ id, room }) => handleNewParticipant(id, room));
    socket.on('leave', ({ room }) => handleLeave(room));

    return () => {
      socket.off('offer');
      socket.off('answer');
      socket.off('candidate');
      socket.off('new-participant');
      socket.off('leave');
    };
  }, []);

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

  const handleOffer = async (offer, from, room) => {
    const peer = createPeer(from, room);
    await peer.signal(offer);
    setPeers(peers => [...peers, { peer, id: from }]);
  };

  const handleAnswer = (answer, from, room) => {
    const peer = peers.find(p => p.id === from)?.peer;
    if (peer) {
      peer.signal(answer);
    }
  };

  const handleCandidate = (candidate, from, room) => {
    const peer = peers.find(p => p.id === from)?.peer;
    if (peer) {
      peer.signal(candidate);
    }
  };

  const handleNewParticipant = (id, room) => {
    const newPeer = createPeer(id, room);
    setPeers(peers => [...peers, { peer: newPeer, id }]);
  };

  const handleLeave = (room) => {
    peers.forEach(({ peer }) => peer.destroy());
    setPeers([]);
    setLocalStream(null);
    setRemoteStreams([]);
    setInRoom(false);
    socket.emit('leave', { room });
  };

  const createPeer = (id, room) => {
    const peer = new SimplePeer({ initiator: isInitiator, stream: localStream });
    peer.on('signal', data => socket.emit('signal', { signal: data, to: id, room }));
    peer.on('stream', stream => setRemoteStreams(streams => [...streams, stream]));
    return peer;
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-6xl text-white mb-8">Welcome to SwapCall</h1>
      {!inRoom ? (
        <div className="flex flex-col items-center w-full max-w-lg px-6 py-8 bg-gray-800 rounded-lg shadow-lg">
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="p-2 mb-4 bg-gray-700 text-white rounded"
            placeholder="Enter Room ID"
          />
          <select onChange={(e) => setSelectedDeviceId(e.target.value)} value={selectedDeviceId} className="p-2 mb-4 bg-gray-700 text-white rounded">
            <option value="">Select Camera</option>
            {videoDevices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>{device.label || `Camera ${device.deviceId}`}</option>
            ))}
          </select>
          <div className="flex space-x-4">
            <button
              onClick={createRoom}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
            >
              Create Room
            </button>
            <button
              onClick={joinRoom}
              className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition"
            >
              Join Room
            </button>
          </div>
        </div>
      ) : (
        <>
          <VideoChatComponent localStream={localStream} remoteStreams={remoteStreams} />
          <button onClick={endCall} className="px-6 py-2 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition mt-4">
            End Call
          </button>
          <ChatComponent roomId={roomId} socket={socket} />
        </>
      )}
    </div>
  );
}

export default SwapCallFeature;
