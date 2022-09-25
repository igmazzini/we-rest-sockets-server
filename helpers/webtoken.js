const jwt = require('jsonwebtoken');

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

module.exports = {
    generateJWT
}