const multer = require('multer');
const path = require('path');

// Configure storage and filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Unique filename
  }
});

// Create Multer instance with storage configuration
const upload = multer({ storage });

module.exports = upload;
