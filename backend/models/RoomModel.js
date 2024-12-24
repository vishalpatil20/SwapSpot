// models/RoomModel.js
const rooms = {};

class RoomModel {
  static createRoom(room, socketId) {
    if (rooms[room]) {
      return { success: false, message: 'Room already exists' };
    } else {
      rooms[room] = [socketId];
      return { success: true, room };
    }
  }

  static joinRoom(room, socketId) {
    if (rooms[room]) {
      rooms[room].push(socketId);
      return { success: true, room };
    } else {
      return { success: false, message: 'Room does not exist' };
    }
  }

  static leaveRoom(room, socketId) {
    if (rooms[room]) {
      rooms[room] = rooms[room].filter((id) => id !== socketId);
      if (rooms[room].length === 0) {
        delete rooms[room];
      }
    }
  }

  static getRooms() {
    return rooms;
  }
}

module.exports = RoomModel;
