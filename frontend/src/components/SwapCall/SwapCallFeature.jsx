import React from 'react';

const SwapCallFeature = () => {
    return (
        <div className="bg-black   p-8">
            <h1 className="text-3xl font-bold mb-8">Welcome to SwapCall</h1>
            <div className="flex space-x-4 mb-4">
                <button className="bg-prim hover:bg-blue-700 text-white font-bold py-0.5 px-1 rounded-full flex items-center" id="cameraBtn">
                    <i className="material-icons mr-2" aria-hidden="true"></i>
                    <span>Open camera & microphone</span>
                </button>
                <button className="bg-prim hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center" disabled id="createBtn">
                    <i className="material-icons mr-2" aria-hidden="true"></i>
                    <span>Create room</span>
                </button>
                <button className="bg-prim hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center" disabled id="joinBtn">
                    <i className="material-icons mr-2" aria-hidden="true"></i>
                    <span>Join room</span>
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full flex items-center" disabled id="hangupBtn">
                    <i className="material-icons mr-2" aria-hidden="true"></i>
                    <span>Hangup</span>
                </button>
            </div>
            <div className="mb-4">
                <span id="currentRoom"></span>
            </div>
            <div id="videos" className="flex justify-center space-x-8 mb-8 bg-white ">
                <video id="localVideo" className="w-1/2 rounded-lg shadow-xl " muted autoPlay playsInline></video>
                <video id="remoteVideo" className="w-1/2 rounded-lg shadow-xl" autoPlay playsInline></video>
            </div>
            <div className="mdc-dialog ">
                <div className="mdc-dialog__container text-white">
                    <div className="mdc-dialog__surface">
                        <h2 className="mdc-dialog__title" id="my-dialog-title">Join room</h2>
                        <div className="mdc-dialog__content" id="my-dialog-content">
                            Enter ID for room to join:
                            <div className="mdc-text-field">
                                <input type="text" id="room-id" className="mdc-text-field__input" />
                                <label className="mdc-floating-label" htmlFor="my-text-field">Room ID</label>
                                <div className="mdc-line-ripple"></div>
                            </div>
                        </div>
                        <footer className="mdc-dialog__actions">
                            <button type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="no">
                                <span className="mdc-button__label">Cancel</span>
                            </button>
                            <button id="confirmJoinBtn" type="button" className="mdc-button mdc-dialog__button" data-mdc-dialog-action="yes">
                                <span className="mdc-button__label">Join</span>
                            </button>
                        </footer>
                    </div>
                </div>
                <div className="mdc-dialog__scrim"></div>
            </div>
        </div>
    );
};

export default SwapCallFeature;
