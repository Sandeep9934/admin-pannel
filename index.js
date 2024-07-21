const express = require('express');
const cors = require('cors');
const connectDB = require('./connection/connection');
const userRoutes = require('./routes/userRoutes');
const listRoutes = require('./routes/listRoute');
const path = require('path');

const app = express();
const port = 5000;

// Connect to the database
connectDB();

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use(userRoutes);
app.use(listRoutes); // Use listRouter

// Start the server
app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});
