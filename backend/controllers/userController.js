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

module.exports = {
    signUp
};
