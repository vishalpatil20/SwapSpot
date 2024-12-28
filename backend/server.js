// server.js
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { PrismaClient } = require('@prisma/client');
const SimplePeer = require('simple-peer');

const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const formRoutes = require('./routes/formRoutes');
const paymentRoutes = require('./routes/paymentRoutes');  

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const prisma = new PrismaClient();
app.use(cors());
app.use(express.json());

let rooms = {};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Create Room
  socket.on('create', ({ room }) => {
    if (rooms[room]) {
      socket.emit('error', 'Room already exists');
    } else {
      rooms[room] = [{ id: socket.id }];
      socket.join(room);
      socket.emit('created', room);
    }
  });

  // Join Room
  socket.on('join', ({ room }) => {
    if (rooms[room]) {
      rooms[room].push({ id: socket.id });
      socket.join(room);
      socket.emit('joined', room);
      socket.to(room).emit('new-participant', { id: socket.id });
    } else {
      socket.emit('error', 'Room does not exist');
    }
  });

  // Send Message
  socket.on('send-message', async ({ room, message, sender }) => {
    if (rooms[room]) {
      const timestamp = new Date();
      io.to(room).emit('receive-message', { message, sender, timestamp });

      try {
        await prisma.message.create({
          data: { message, sender, roomId: room, timestamp },
        });
      } catch (error) {
        console.error('Error saving message to the database:', error);
        socket.emit('error', 'Failed to save message to database');
      }
    } else {
      socket.emit('error', 'Room does not exist');
    }
  });

  // Handle WebRTC Signals
  socket.on('signal', ({ signal, to, room }) => {
    io.to(to).emit('signal', { signal, from: socket.id, room });
  });

  // Leave Room
  socket.on('leave', ({ room }) => {
    if (rooms[room]) {
      rooms[room] = rooms[room].filter(participant => participant.id !== socket.id);
      socket.leave(room);

      if (rooms[room].length === 0) {
        delete rooms[room];
      }
    }
  });

  // Handle Disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);

    Object.keys(rooms).forEach(room => {
      rooms[room] = rooms[room].filter(participant => participant.id !== socket.id);
      if (rooms[room].length === 0) {
        delete rooms[room];
      }
    });
  });
});

// Routes
app.use('/users', userRoutes);
app.use('/chat', chatRoutes);
app.use('/form', formRoutes);
app.use('/pay', paymentRoutes);  // Ensure this is correct

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
