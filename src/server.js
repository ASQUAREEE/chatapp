// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('message', (data) => {
    // Handle received messages
    console.log('Received message:', data);
    // Broadcast the message to all connected clients
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
