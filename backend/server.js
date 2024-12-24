const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const rateLimit = require('express-rate-limit'); // Import rate limiter
const userRoutes = require('./routes/userRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Rate Limiting Middleware
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});
app.use('/users', authLimiter); // Apply rate limiting to '/users' route

// Routes
app.use('/users', userRoutes);
app.use('/payments', userPayments);

// Socket.IO Setup
const rooms = {};
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Room Creation
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

  // Room Joining
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

  // Handle disconnect
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

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
