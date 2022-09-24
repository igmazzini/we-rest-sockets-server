const mongoose = require('mongoose');

const dbConnection = async () =>{

    try {

        mongoose.connect(process.env.MONGODB_CNN,{
            useNewUrlParser:true,
            /* userUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false */
        });


        console.log('DB online');
        
    } catch (error) {

        throw new Error(`Init DB error: ${error}`);
    }

}


module.exports = {
    dbConnection
}