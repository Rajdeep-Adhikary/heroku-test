const websocket = require('../../src/websockets/websocket');
const socketio = require('socket.io');
const appConfig = require('../../config/appConfig');


let startSocket = (server) => {
  const io = socketio(server, {
      cors : {
          origin : ['http://localhost', 'https://www.rajdeepadhikary.com', 'https://rajdeepadhikary.com']
      }
  });
    // let gameIO = io.of(`/${appConfig.socketNameSpace}`);
    websocket.setNSP(io);
}

module.exports = {
    startSocket:startSocket
}