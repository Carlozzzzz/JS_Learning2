/**
 * Tutorial
 * https://www.youtube.com/watch?v=tVUE_JiPU-k
 * 
 */

const express = require('express');
const app = express();
const path = require('path');

const http = require('http').Server(app);
const port = process.env.PORT || 8080;

// attach http server to te socker.io
const io = require('socket.io')(http);



// route
app.get('/', (req, res) => {
    // res.json("get Request");
    res.sendFile(path.join(__dirname, 'src/home.html'));
})


// create new connection
io.on('connection', socket => {
    console.log("User connected " + socket.id);

    socket.on('disconnect', ()=> {
        console.log("A user disconnected."  + socket.id);
    });

    socket.on("message", msg => {
        console.log('Client msg : ' + msg)
    });

    sendMessage(socket)
});


http.listen(port, () => {
    console.log('Server is listening...');
})

async function sendMessage(socket) {
    socket.emit("server", "Server response. {server}");
    socket.emit("server1", "Server response. {server1}.");
    socket.emit("server2", "Server response. {serve2}.");
}