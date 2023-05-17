const path = require("path");
const express = require('express');
const app = express();
const http =  require('http');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server, {
    cors : {
        origin : ['http://localhost']
    }
});

const publicDirectoryPath = path.join(__dirname, "./public");

app.use(express.static(publicDirectoryPath));

require('dotenv').config();
const port = process.env.PORT;


io.on('connection', (socket) => {
    console.log('Socket Connected');

    socket.on('send-message', (message, room) => {
        if(room === '')
            socket.broadcast.emit('send-to-other', message);
        else
            socket.to(room).emit('send-to-other', message);
    })

    socket.on('join-room', (room, callback) => {
        socket.join(room);
        callback(`You have joined to ${room} room`)
    })

    socket.on('leave-room', (room, callback) => {
        socket.leave(room);
        callback(`You have left from ${room} room`)
    })
})



server.listen(port, () => {
    console.log(`app is running on ${port}`);   
})