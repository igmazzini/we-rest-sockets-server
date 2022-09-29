
const express = require('express');
const cors = require('cors');
const router = require('../routes/user');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){

       this.port = process.env.PORT;

       this.app = express();

       //Routes path 
       this.paths = {
            auht:       '/api/auth',
            users:      '/api/users',
            categoires: '/api/categories',
            products:   '/api/products',
            search:     '/api/search'
       }
      

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

        this.app.use( this.paths.auht, require('../routes/auth'));
        this.app.use( this.paths.users, require('../routes/user'));
        this.app.use( this.paths.categoires, require('../routes/category'));
        this.app.use( this.paths.products, require('../routes/product'));
        this.app.use( this.paths.search, require('../routes/search'));
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