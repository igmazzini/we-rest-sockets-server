
const express = require('express');
const cors = require('cors');
const router = require('../routes/user');

class Server {

    constructor(){

       this.port = process.env.PORT;

       this.app = express();
       
       //Middlewares
       this.middlewares(); 

       //Rutas
       this.routes();     
        

    }


    middlewares() {

        //CORS
        this.app.use( cors() );

        //Parse del body
        this.app.use( express.json() );

        //Directorio publico
        this.app.use( express.static('public') );
        
    }


    routes(){

        this.app.use('/api/users', require('../routes/user'));
    }


    init(){
        this.app.listen(this.port);
    }

}

module.exports = Server;