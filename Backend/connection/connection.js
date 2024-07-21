const mongoose = require("mongoose");

// Replace the URI string with your MongoDB connection string.
const uri = "mongodb+srv://sandeep:sandeep@cluster0.nc5py48.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connecting to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Successfully connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = connectDB;
