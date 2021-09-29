const express = require('express');
const https = require('http');
const socketIO = require('socket.io');
const logger = require('./config/logger');

const app = express();
const serverSocket = https.createServer(app);

const io = socketIO(serverSocket);

(() => {
  io.on('connection', (socket) => {
    socket.on('disconnect', () => {});
    // server listening to client
    socket.on('Client-sent-data', (data) => {
      // server send data to client
      socket.emit('Server-sent-data', data);
    });
  });

  serverSocket.listen(8081, () => {
    logger.info(`Socket Listening to port 8081`);
  });
})();
