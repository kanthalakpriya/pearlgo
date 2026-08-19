require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs'); // pure javascript version (C++ Build tools අවශ්‍ය නැත)
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/ceylonguide'
});

// Home route
app.get('/', (req, res) => {
  res.send('CeylonGuide API is running...');
});

// Middleware: Authentication
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// 1. 30% Initial Payment Verification Route
app.post('/api/bookings/:id/pay', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    // Payment update logic
    res.json({ message: 'Payment successful. Secure chat unlocked.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Booking-Specific Locked Chat Route with Contact Sharing Filter
app.post('/api/chat/:bookingId/message', authenticate, async (req, res) => {
  const { content } = req.body;

  // Filter phone numbers, emails, links
  const contactRegex = /(\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b)|(\b\d{9,15}\b)|(http|www|wa\.me|t\.me)/gi;
  if (contactRegex.test(content)) {
    return res.status(403).json({ 
      error: 'Sharing personal contact information is not permitted. Please continue communicating securely through CeylonGuide.' 
    });
  }

  res.json({ message: 'Message sent successfully' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Backend running on port ' + PORT));