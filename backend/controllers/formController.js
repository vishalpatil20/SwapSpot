const { PrismaClient } = require('@prisma/client');

// Initialize PrismaClient
const prisma = new PrismaClient();

exports.registerForm = async (req, res) => {
  const { username, firstName, lastName, email, country, streetAddress, city, region, postalCode } = req.body;

  try {
    // Use the prisma instance to create a new form entry
    const newForm = await prisma.form.create({
      data: {
        username,
        firstName,
        lastName,
        email,
        country,
        streetAddress,
        city,
        region,
        postalCode,
      },
    });

    res.status(201).json({ message: 'Form submitted successfully', form: newForm });
  } catch (error) {
    console.error('Error saving form details:', error);
    res.status(500).json({ error: 'Error saving form details', details: error.message });
  }
};
