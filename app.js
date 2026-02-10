import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import { Server } from 'socket.io';
import http from 'http';
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js'
import { initdb } from './src/configs/initdb.js';
import CookieParser from 'cookie-parser';

// dotenv config
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

await initdb();
// Create HTTP server from Express app
const server = http.createServer(app);

// Attach Socket.IO to the server
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(CookieParser());

// Import static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'html', 'landingpage.html'));
});

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

io.on('connection', (socket) => {
  console.log('a user connected');
   socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Start server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
