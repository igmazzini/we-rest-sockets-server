
const express = require('express');
const cors = require('cors');
const router = require('../routes/user');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){

       this.port = process.env.PORT;

       this.app = express();

       //Routes path 
       this.loginPath = '/api/auth';
       this.usersPath = '/api/users';

       //Conxion con base de datos 
       this.connectDB();
      
       
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

        this.app.use( this.loginPath, require('../routes/auth'));
        this.app.use( this.usersPath, require('../routes/user'));
    }

    async connectDB() {
        await dbConnection();
    }  


    init(){

        this.app.listen(this.port, () =>{
            console.log(`Server in port ${this.port}`);
        });
        
    }

   

}

module.exports = Server;