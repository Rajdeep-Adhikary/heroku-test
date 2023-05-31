const express = require('express');
const app = express();
const http =  require('http');
const socketio = require('socket.io');
const users = require('./src/controllers/user');
const server = require('./www/rest/server');


// const server = http.createServer(app);



require('dotenv').config();
const port = process.env.PORT;




app.get('/', (req, res) => {
    res.send('Server running');
})


server.startServer(app);