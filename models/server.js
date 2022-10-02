
const express = require('express');
const cors = require('cors');
const router = require('../routes/user');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');
const { socketsController } = require('../controllers/sockets/socket');

class Server {

    constructor(){

       this.port = process.env.PORT;

       this.app = express();

       this.server = require('http').createServer(this.app);

       this.io = require('socket.io')(this.server);

       //Routes path 
       this.paths = {
            auht:       '/api/auth',
            users:      '/api/users',
            categoires: '/api/categories',
            products:   '/api/products',
            search:     '/api/search',
            upload:     '/api/upload',
       }
      

       //Conxion con base de datos 
       this.connectDB();
      
       
       //Middlewares
       this.middlewares(); 

       //Rutas
       this.routes();     


       //Sockets
       this.sockets();
        

    }


    middlewares() {

        //CORS
        this.app.use( cors() );

        //Parse body
        this.app.use( express.json() );

        //Directorio publico
        this.app.use( express.static('public') );

        //Uploads        
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
        
    }


    routes(){

        this.app.use( this.paths.auht, require('../routes/auth'));
        this.app.use( this.paths.users, require('../routes/user'));
        this.app.use( this.paths.categoires, require('../routes/category'));
        this.app.use( this.paths.products, require('../routes/product'));
        this.app.use( this.paths.search, require('../routes/search'));
        this.app.use( this.paths.upload, require('../routes/upload'));
    }

    async connectDB() {
        await dbConnection();
    }  


    sockets(){

        this.io.on("connection", socketsController );
    }


    init(){

        this.server.listen(this.port, () =>{
            console.log(`Server in port ${this.port}`);
        });
        
    }

   

}

module.exports = Server;