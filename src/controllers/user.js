let users = [];

module.exports = {
    addUser : (id, username, room) => {
        users.push({
            id   : id,
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
                    temp.push(user.name);
            });
        }
        return temp;
    },
    removeUser : (id) => {
        let pos = users.findIndex(user => user.id === id);
        if(pos >= 0){
            users.splice(pos, 1);
        }
    }
}