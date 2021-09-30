const express = require('express');
const https = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const path = require('path');
const logger = require('./config/logger');

const app = express();
const serverSocket = https.createServer(app);

const io = socketIO(serverSocket);

app.use(cors());

app.options('*', cors());

// use template send email
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/template/views'));

app.use('/socket', (req, res) => {
  res.render('index');
});

io.on('connection', (socket) => {
  socket.on('disconnect', () => {});
  // server listening to client
  socket.on('chat-message', (data) => {
    // server send data to client
    io.emit('send-message', data);
  });
});

serverSocket.listen(8081, () => {
  logger.info(`Socket Listening to port 8081`);
});

(() => {})();
