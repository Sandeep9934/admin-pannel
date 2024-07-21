// In routes/authRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Adjust path as needed
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For creating tokens

// POST /api/login
router.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate a token (optional)
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
