const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user with the provided email already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (existingUser) {
            return res.status(400).json({ error: "User with this email already exists" });
        }
        // Create new user
        const newUser = await prisma.user.create({
            data: { name, email, password }
        });
        // console.log("User created:", newUser);
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Signup Failed:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user with the provided email exists
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Check if password matches
        if (user.password !== password) {
            return res.status(401).json({ error: "Incorrect password" });
        }
        // Login successful
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("Login Failed:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
module.exports = {
    signUp,
    login
};
