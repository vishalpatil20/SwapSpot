import React, { useRef, useEffect } from 'react';

const VideoChatComponent = ({ localStream, remoteStreams }) => {
  const localVideoRef = useRef(null);

  useEffect(() => {
    if (localStream) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  return (
    <div className="flex space-x-4">
      <div className="relative w-1/2">
        <video ref={localVideoRef} autoPlay muted className="w-full h-full object-cover rounded-lg shadow-lg" />
        <div className="absolute bottom-2 right-2 text-white">You</div>
      </div>
      {remoteStreams.map((stream, index) => (
        <div key={index} className="relative w-1/2">
          <video
            ref={(ref) => {
              if (ref) {
                ref.srcObject = stream;
              }
            }}
            autoPlay
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
          <div className="absolute bottom-2 right-2 text-white">Remote {index + 1}</div>
        </div>
      ))}
    </div>
  );
};

export default VideoChatComponent;
