import cors from 'cors';
import DOMPurify from 'dompurify';
import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import winston from 'winston';
import router from './router';
import { addUser, getUser, getUsersInRoom, removeUser } from './users';

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Apply security and rate limit middleware
router.applySecurityAndRateLimit(app);

// Enable CORS
app.use(cors());

// Use router for handling routes
app.use(router);

// Socket.io connection handling
io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    try {
      if (typeof name !== 'string' || typeof room !== 'string') {
        throw new Error('Name and room must be strings.');
      }
      name = DOMPurify.sanitize(name);
      room = DOMPurify.sanitize(room);
      const { error, user } = addUser({ id: socket.id, name, room });
      if (error) return callback(error);

      socket.join(user.room);
      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.` });
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
      callback();
    } catch (error) {
      callback(error.message);
    }
  });

  socket.on('sendMessage', (message, callback) => {
    try {
      const user = getUser(socket.id);
      if (typeof message !== 'string' || message.length === 0) {
        throw new Error('Message must be a non-empty string.');
      }
      const sanitizedMessage = DOMPurify.sanitize(message);
      io.to(user.room).emit('message', { user: user.name, text: sanitizedMessage });
      callback();
    } catch (error) {
      callback(error.message);
    }
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  winston.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => winston.error(`Server has started on port ${PORT}.`));