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
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(bodyParser.json());
app.set('io', io);  // ⭐ make io accessible in routes

app.use('/api', videoRoutes);

app.get('/', (req, res) => {
  res.send('🎥 Video Downloader Backend is running');
});

io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
