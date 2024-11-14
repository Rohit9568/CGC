const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const Module = require('./models/Module.js');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Use CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const tokenRoutes = require('./routes/tokenRoutes.js');
const moduleRoutes = require('./routes/moduleRoutes.js');
app.use('/api/auth', authRoutes);
app.use('/api/token', tokenRoutes);
app.use('/api/modules', moduleRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
