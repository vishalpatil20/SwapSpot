const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Hash Password
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

// Signup Controller
const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });

        const token = generateToken(newUser.id);

        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        console.error('Signup Failed:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Login Controller
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect email or password' });
        }

        const token = generateToken(user.id);

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login Failed:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    signup,
    login,
};
