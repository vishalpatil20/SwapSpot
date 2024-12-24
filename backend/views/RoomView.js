// views/RoomView.js
const { Server } = require('socket.io');

class RoomView {
  static onRoomCreated(socket, room) {
    const io = new Server(socket.server); // Pass the server instance
    io.to(socket.id).emit('created', room);
  }

  static onRoomJoined(socket, room) {
    const io = new Server(socket.server); // Pass the server instance
    io.to(socket.id).emit('joined', room);
    io.to(room).emit('new-participant', { id: socket.id });
  }

  static onRoomDeleted(room) {
    console.log(`Room deleted: ${room}`);
  }
}

module.exports = RoomView;
