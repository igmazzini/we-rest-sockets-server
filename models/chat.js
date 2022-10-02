class Message {

    constructor(uid, name, msg){
        this.uid = uid;
        this.name = name;
        this.msg = msg;
    }
}

class Chat {

    constructor(){
        this.messages = [];
        this.users = {};
    }


    get lastMessages() {

        this.messages =  this.messages.splice(0,10);

        return this.messages;
    }

    get userList() {
        return Object.values( this.users );
    }


    sendMessage( uid, name, msg) {

        const message = new Message(uid, name, msg);

        this.messages.unshift(message);
    }

    addUser( user ) {
        this.users[user.id] = user;
    }

    removeUser( id ) {       

        delete this.users[id];       
    }
}

module.exports = {
    Chat,
    Message
}