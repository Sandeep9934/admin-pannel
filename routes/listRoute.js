const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Route to get all users
router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.status(200).json(users); // Send users as response
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
