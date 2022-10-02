const { verifyJTW } = require("../../helpers");
const { Chat } = require("../../models");

const chat = new Chat();

const socketsController = async (client, io) => {


    const token = client.handshake.headers['auth-token'];

    const user = await verifyJTW(token);  

    if (!user) return client.disconnect();

    chat.addUser(user);

    io.emit('on-active-users',chat.userList);

    client.emit('on-server-message', chat.lastMessages);

    client.join( user.id );//global, socket.id, user.id 


    client.on('disconnect',  async () => {       
    
        chat.removeUser(user._id);

        io.emit('on-active-users',chat.userList);
    }); 

    client.on('on-client-message',  async (payload) => {

        const {msg, uid} = payload;

        if(uid){
            //Private message
            client.to(uid).emit('on-user-message', {from:user.name , msg});


        }else{

            chat.sendMessage(user.uid, user.name, msg);

            io.emit('on-server-message', chat.lastMessages);
        }

      
        
    }); 

}

module.exports = {
    socketsController
}