const jwt = require('jsonwebtoken');
const { User } = require('../models');

const generateJWT = ( uid = '', expiresIn = '4h') => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETKEY,{
            expiresIn
        }, (err, token) =>{

            if(err) {

                console.log(err);

                reject(`generateJWT error: ${err}`)

            }else{

                resolve(token);

            }          

        } );

    });
}


const verifyJTW = async( token = '') =>{

    try {

        if( token.length < 0 ){
            return null;
        }

        const { uid } = jwt.verify(token, process.env.SECRETKEY);

        const user = await User.findById(uid);

        if(user && user.status){

            return user;            

        }else {

            return null;
        }        
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    generateJWT,
    verifyJTW
}