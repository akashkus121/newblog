const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const IndexRoute = require("./Routers/index");
const connectDatabase = require("./Helpers/database/connectDatabase");
const customErrorHandler = require("./Middlewares/Errors/customErrorHandler");

// Load environment variables from .env file
dotenv.config({
  path: path.join(__dirname, 'Config', '.env')
});

// Debug logging to check if environment variables are loaded correctly
console.log('Loaded environment variables:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('MONGO_URI:', process.env.MONGO_URI);

// Connect to the database
connectDatabase();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", IndexRoute);

// Custom error handler
app.use(customErrorHandler);

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} : ${process.env.NODE_ENV}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error : ${err}`);
  server.close(() => process.exit(1));
});
