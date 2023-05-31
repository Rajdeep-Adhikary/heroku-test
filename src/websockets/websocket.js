const users = require('../controllers/user');

let setNSP = (io) => {
    io.on('connection', (socket) => {
        console.log('Socket Connected');
    
    
        socket.on('send-message', (user, message, room) => {
            if(room === '')
                socket.broadcast.emit('send-to-other', user, message); 
            else
                socket.to(room).emit('send-to-other', user, message);
            
            var all_users = users.getUserByRoom(room);
            io.in(room).emit('update-user-list', all_users);
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
            users.addUser(socket.id, user, room);
            socket.join(room);
            callback({ message : `You have joined to ${room} room`, error : '' });
            var all_users = users.getUserByRoom(room);
            socket.to(room).emit('user-joined', user);
            io.in(room).emit('update-user-list', all_users);
        })
    
        socket.on('leave-room', (room, user, callback) => {
            socket.leave(room);
            callback()
            socket.to(room).emit('user-left', user);
            var all_users = users.getUserByRoom(room);
            users.removeUser(socket.id);
            io.in(room).emit('update-user-list', all_users);
        })
    
        socket.on('disconnect', function() {
            let user = users.getUserById(socket.id);
            if(user){
                socket.to(user.room).emit('user-left', user.name);
                users.removeUser(socket.id);
                var all_users = users.getUserByRoom(user.room);
                io.in(user.room).emit('update-user-list', all_users);
            }
        });
    })
}

module.exports = {
    setNSP:setNSP
}