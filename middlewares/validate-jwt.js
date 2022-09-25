const  { request ,response  } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');




const validateJWT = async( req = request, res = response, next) =>{

   const token = req.header('auth-token');

   if ( !token ) {
      return res.status(401).json({
        msg:'Token is required'
      });
   }


   try {

    const { uid } = jwt.verify( token, process.env.SECRETKEY );

    const authUser = await User.findById(uid);

    if( !authUser ){
        return res.status(401).json({
        msg:'Invalid token - User does not exist'
        });
    }

    if( !authUser.status ){
        return res.status(401).json({
        msg:'Invalid token - User has been disabled'
        });
    }

    req.authUser = authUser;
    
    next();

   } catch (error) {

      console.log(error)  
      return res.status(401).json({
        msg:'Invalid token'
      });
   }

   

   
}

module.exports = {
    validateJWT
}