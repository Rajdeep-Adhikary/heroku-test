let setNSP = (io) => {
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
            callback({ message : `You have joined to ${room} room`, error : '' });
            var all_users = users.getUserByRoom(room);
            socket.to(room).emit('user-joined', user);
            io.in(room).emit('update-user-list', all_users);
        })
    
        socket.on('leave-room', (room, user, callback) => {
            socket.leave(room);
            callback()
            socket.to(room).emit('user-left', user);
        })
    
        socket.on('disconnect', function() {
            clients.splice(clients.indexOf(client), 1);
        });
    })
}

module.exports = {
    setNSP:setNSP
}