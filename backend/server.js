const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { PrismaClient } = require('@prisma/client');
const SimplePeer = require('simple-peer');

const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');

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

  socket.on('create', ({ room }) => {
    if (rooms[room]) {
      socket.emit('error', 'Room already exists');
    } else {
      rooms[room] = [socket.id];
      socket.join(room);
      socket.emit('created', room);
    }
  });

  socket.on('join', ({ room }) => {
    if (rooms[room]) {
      rooms[room].push(socket.id);
      socket.join(room);
      socket.emit('joined', room);
      socket.to(room).emit('new-participant', { id: socket.id });
    } else {
      socket.emit('error', 'Room does not exist');
    }
  });

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
      }
    } else {
      socket.emit('error', 'Room does not exist');
    }
  });

  socket.on('offer', ({ offer, from, room }) => {
    const peer = createPeer(from, room);
    peer.signal(offer);
    rooms[room].push({ peer, id: from });
  });

  socket.on('answer', ({ answer, from, room }) => {
    const peer = rooms[room].find(p => p.id === from)?.peer;
    if (peer) {
      peer.signal(answer);
    }
  });

  socket.on('candidate', ({ candidate, from, room }) => {
    const peer = rooms[room].find(p => p.id === from)?.peer;
    if (peer) {
      peer.signal(candidate);
    }
  });

  socket.on('new-participant', ({ id, room }) => {
    const newPeer = createPeer(id, room);
    rooms[room].push({ peer: newPeer, id });
  });

  socket.on('leave', ({ room }) => {
    if (rooms[room]) {
      rooms[room].forEach(({ peer }) => {
        if (peer) {
          peer.destroy();
        }
      });
      rooms[room] = [];
      socket.leave(room);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    Object.keys(rooms).forEach(room => {
      rooms[room] = rooms[room].filter(({ id }) => id !== socket.id);
      if (rooms[room].length === 0) {
        delete rooms[room];
      }
    });
  });

  const createPeer = (id, room) => {
    const peer = new SimplePeer({ initiator: true, stream: localStream });
    peer.on('signal', data => socket.emit('signal', { signal: data, to: id, room }));
    peer.on('stream', stream => setRemoteStreams(streams => [...streams, stream]));
    return peer;
  };
});

app.use('/users', userRoutes);
app.use('/chat', chatRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
