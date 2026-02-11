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

const SendMsg='';

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

io.on('connection',async (socket) => {
  socket.on('chat message', async (msg, callback) => {
    console.log("user connected");
    console.log(msg);
    callback({
      status: 'ok'
    });
    try {
    const response = await socket.timeout(5000).emitWithAck('chat message', msg);
    console.log(response.status);
  }catch(e)
  {
    console.log("didn't get acknowledgment from client", + e);
  }
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
