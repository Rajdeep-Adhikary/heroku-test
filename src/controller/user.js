let users = [];

module.exports = {
    addUser : (username, room) => {
        users.push({
            name : username,
            room : room
        });
    },
    exist : (username, room) => {
        let user = users.findIndex(user => user.name === username && user.room === room);
        if(user >= 0)
            return true;
        else
            return false;
    },
    getUserByRoom : (room) => {
        let temp = [];
        if(users.length > 0){
            users.forEach(user => {
                if(user.room === room)
                    temp.push(user);
            });
        }
        return temp;
    },
    removeUser : (username, room) => {
        let pos = users.findIndex(user => user.name === username && user.room === room);
        if(pos >= 0){
            users.splice(pos, 1);
        }
    }
}