const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const { apiLimiter, contactLimiter } = require('./middleware/rateLimiter');
require('dotenv').config();

// Check for JWT Secret
if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is not defined in environment variables');
  process.exit(1);
}

const app = express();

// Connect to database
connectDB();

// Init Middleware
app.use(cors({
  origin: '*', // Allow all origins
  credentials: true
}));
app.use(express.json({ extended: false }));

// Rate limiting
app.use('/api/', apiLimiter);
app.use('/api/contact', contactLimiter);

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));