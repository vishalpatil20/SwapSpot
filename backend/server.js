const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const rateLimit = require('express-rate-limit');
const userRoutes = require('./routes/userRoutes');
const RoomController = require('./controllers/RoomController');

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

// Socket.IO Setup
RoomController.initialize(server); // Ensure the RoomController is initialized with server instance

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Room Creation
  socket.on('create', ({ room }) => RoomController.createRoom(socket, room));

  // Room Joining
  socket.on('join', ({ room }) => RoomController.joinRoom(socket, room));

  // Handle disconnect
  socket.on('disconnect', () => RoomController.leaveRoom(socket)); // Removed `room` parameter
});

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
