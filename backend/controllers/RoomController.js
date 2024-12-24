// controllers/RoomController.js
const RoomModel = require('../models/RoomModel');
const RoomView = require('../views/RoomView');

class RoomController {
  static initialize(server) {
    RoomView.server = server;
  }

  static createRoom(socket, room) {
    const result = RoomModel.createRoom(room, socket.id);
    if (result.success) {
      RoomView.onRoomCreated(socket, room);
    } else {
      socket.emit('error', result.message);
    }
  }

  static joinRoom(socket, room) {
    const result = RoomModel.joinRoom(room, socket.id);
    if (result.success) {
      RoomView.onRoomJoined(socket, room);
    } else {
      socket.emit('error', result.message);
    }
  }

  static leaveRoom(socket, room) {
    RoomModel.leaveRoom(room, socket.id);
    RoomView.onRoomDeleted(room);
  }
}

module.exports = RoomController;
