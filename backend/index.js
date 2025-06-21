const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const videoRoutes = require('./routes/videoRoutes');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',  // Allow all origins; in production, tighten this
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(bodyParser.json());
app.set('io', io);  // Make io accessible in routes

app.use('/api', videoRoutes);

app.get('/', (req, res) => {
  res.send('🎥 Video Downloader Backend is running');
});

io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);

  // Optional keep-alive to prevent Render WebSocket idle timeout
  const pingInterval = setInterval(() => {
    socket.emit('ping', { timestamp: Date.now() });
  }, 20000); // every 20 seconds

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
    clearInterval(pingInterval);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
