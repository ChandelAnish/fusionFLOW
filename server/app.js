require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./router/router');
const connectDB = require('./db/connectDB');
const cookieParser = require('cookie-parser');
const { createServer } = require('http');
const socketConnection = require('./socket-io/socket');

// Middleware
app.use(
  cors({
    // origin: process.env.CLIENT_URL,
    origin: [process.env.CLIENT_URL,process.env.SIGNIN_URL,process.env.SIGNUP_URL],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', router);

// Create HTTP server
const server = createServer(app);

// Initialize Socket.IO connection
socketConnection(server);

// Start server and connect to DB
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    server.listen(port, () => {
      console.log('Server listening at PORT and connected to DB', port);
    });
  } catch (error) {
    console.log('error occurred : ', error);
  }
};

start();
