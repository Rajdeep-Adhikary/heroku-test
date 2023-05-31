const http = require('http');
const ws = require('../socket/ws');
require('dotenv').config();

const startServer = (app)=>{
       const server = http.createServer(app);

        server.listen(process.env.PORT);

        server.on('listening',()=>{
            console.log(`server listening on port : ${process.env.PORT}`);
            ws.startSocket(server);
        });

        server.on('error',(err)=>{
            console.log(`Error : ${err}`);
        });
}

module.exports = {
    startServer : startServer
}