const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

const rooms = {};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('create', ({ room }) => {
    if (rooms[room]) {
      socket.emit('error', 'Room already exists');
    } else {
      rooms[room] = [socket.id];
      socket.join(room);
      socket.emit('created', room);
      console.log(`Room created: ${room}`);
    }
  });

  socket.on('join', ({ room }) => {
    if (rooms[room]) {
      rooms[room].push(socket.id);
      socket.join(room);
      socket.emit('joined', room);
      console.log(`User joined room: ${room}`);
      socket.to(room).emit('new-participant', { id: socket.id });
    } else {
      socket.emit('error', 'Room does not exist');
    }
  });

  socket.on('offer', ({ room, offer, to }) => {
    socket.to(to).emit('offer', { offer, from: socket.id });
  });

  socket.on('answer', ({ room, answer, to }) => {
    socket.to(to).emit('answer', { answer, from: socket.id });
  });

  socket.on('candidate', ({ room, candidate, to }) => {
    socket.to(to).emit('candidate', { candidate, from: socket.id });
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    for (const room in rooms) {
      rooms[room] = rooms[room].filter((id) => id !== socket.id);
      if (rooms[room].length === 0) {
        delete rooms[room];
        console.log(`Room deleted: ${room}`);
      }
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
