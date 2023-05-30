const path = require("path");
const express = require('express');
const app = express();
const http =  require('http');
const socketio = require('socket.io');
const users = require('./src/controller/user');

// const cors = require('cors');

// const corsOption = {
//     origin: ['https://www.rajdeepadhikary.com', 'https://rajdeepadhikary.com'],
// };
// app.use(cors(corsOption));
// //if you want in every domain then
// app.use(cors())


const server = http.createServer(app);
const io = socketio(server, {
    cors : {
        origin : ['http://localhost', 'https://www.rajdeepadhikary.com', 'https://rajdeepadhikary.com']
    }
});

// const publicDirectoryPath = path.join(__dirname, "./public");

// app.use(express.static(publicDirectoryPath));

require('dotenv').config();
const port = process.env.PORT;


io.on('connection', (socket) => {
    console.log('Socket Connected');

    socket.on('send-message', (user, message, room) => {
        if(room === '')
            socket.broadcast.emit('send-to-other', user, message); 
        else
            socket.to(room).emit('send-to-other', user, message);
    })

    socket.on('join-room', (room, user, callback) => {
        if(room === '' || room === undefined){
            callback({ msg : '', error : 'Room is required' });
            return false;
        }
        if(user === '' || user === undefined){
            callback({ msg : '', error : 'Username is required' });
            return false;
        }
        if(users.exist(user, room)){
            callback({ msg : '', error : 'Username already exist in this room' });
            return false;
        }
        users.addUser(user, room);
        socket.join(room);
        callback({ msg : `You have joined to ${room} room`, error : '' });
        var all_users = users.getUserByRoom(room);
        socket.to(room).emit('user-joined', user, all_users);
    })

    socket.on('leave-room', (room, user, callback) => {
        socket.leave(room);
        callback()
        socket.to(room).emit('user-left', user);
    })
})

app.get('/', (req, res) => {
    res.send('Server running');
})


server.listen(port, () => {
    console.log(`app is running on ${port}`);   
})