const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const userPayments = require('./routes/userPayments');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/users', userRoutes);
app.use('/payments', userPayments);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
