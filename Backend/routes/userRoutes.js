const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const User = require('../models/user');

router.post('/api/users', upload.single('image'), async (req, res) => {
  try {
    const { name, email, phone, designation, gender, course } = req.body;
    const image = req.file ? req.file.filename : null;

    const newUser = new User({
      name,
      email,
      phone,
      designation,
      gender,
      course,
      image,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Server error:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
