const express = require('express');
const { PrismaClient } = require('@prisma/client'); // Import Prisma Client directly
const prisma = new PrismaClient();

const router = express.Router();

// Add a new message
router.post('/messages', async (req, res) => {
  try {
    const { roomId, sender, message } = req.body;

    // Ensure all required fields are present
    if (!roomId || !sender || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newMessage = await prisma.message.create({
      data: {
        roomId,
        sender,
        message,
        timestamp: new Date(), // Ensure the timestamp is explicitly added if needed
      },
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// Get messages for a room
router.get('/messages/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;

    // Validate roomId
    if (!roomId) {
      return res.status(400).json({ error: 'Room ID is required' });
    }

    const messages = await prisma.message.findMany({
      where: { roomId },
      orderBy: { timestamp: 'asc' },
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

module.exports = router;
