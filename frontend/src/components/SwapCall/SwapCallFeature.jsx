import React from 'react';

const SwapCallFeature = () => {
    return (
        <div className="bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8 text-center text-prim">Welcome to SwapCall</h1>
            <div className="flex justify-center space-x-4 mb-4">
                <button className="bg-prim hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center">
                    <i className="fas fa-video mr-2"></i>
                    <span>Open camera & microphone</span>
                </button>
                <button className="bg-prim hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center" disabled>
                    <i className="fas fa-plus-circle mr-2"></i>
                    <span>Create room</span>
                </button>
                <button className="bg-prim hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center" disabled>
                    <i className="fas fa-sign-in-alt mr-2"></i>
                    <span>Join room</span>
                </button>
                <button className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex items-center" disabled>
                    <i className="fas fa-phone-slash mr-2"></i>
                    <span>Hangup</span>
                </button>
            </div>
            <div className="mb-4 text-center">
                <span className="text-gray-600">Current Room: <span id="currentRoom">-</span></span>
            </div>
            <div id="videos" className="flex justify-center space-x-8 mb-8">
                <video id="localVideo" className="w-1/2 rounded-lg shadow-xl" muted autoPlay playsInline></video>
                <video id="remoteVideo" className="w-1/2 rounded-lg shadow-xl" autoPlay playsInline></video>
            </div>
            <div className="flex justify-center">
                <div className="bg-white rounded-lg p-10 max-w-sm">
                    <h2 className="text-xl font-bold mb-4">Join Room</h2>
                    <div className="mb-4">
                        <label htmlFor="room-id" className="block text-gray-700 font-bold mb-2">Room ID</label>
                        <input type="text" id="room-id" className="border rounded-md px-3 py-2 w-full" />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" className="bg-prim hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" data-mdc-dialog-action="no">
                            Cancel
                        </button>
                        <button id="confirmJoinBtn" type="button" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full ml-2" data-mdc-dialog-action="yes">
                            Join
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SwapCallFeature;
