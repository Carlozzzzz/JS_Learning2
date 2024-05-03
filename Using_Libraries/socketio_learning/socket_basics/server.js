const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Use the cors middleware for Socket.IO
io.use(cors({
    origin: 'http://localhost:8080', // Replace with your front-end URL
    methods: ['GET', 'POST'],
    credentials: true,
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.php');
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });

    socket.on('message', (msg) => {
        console.log('Client message:', msg);
    });

    socket.emit('server', 'Message from server');
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
