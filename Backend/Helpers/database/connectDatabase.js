const mongoose = require("mongoose");
require('dotenv').config(); // Load environment variables from .env file

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("MongoDB Connection Successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDatabase;
