const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const getNotifications = async (req, res) => {
    try {
        // Extract the token from the request headers
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        
        // Verify the token and extract the user ID
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // Extract the email from the request body
        const { email } = req.body;

        // Find the user by their email
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        // If user not found, return 404
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the user ID extracted from token matches the user ID associated with the email
        if (userId !== user.id) {
            return res.status(403).json({ message: 'Unauthorized access' });
        }

        // Fetch notifications from the database for the authenticated user
        const notifications = await prisma.notification.findMany({
            where: {
                userId: user.id
            }
        });

        // Respond with the notifications
        res.json({ notifications });
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    getNotifications
};
