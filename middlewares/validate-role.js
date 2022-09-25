const  { request ,response  } = require('express');





const validateRole = ( ...roles ) => {

    return async (req = request, res = response, next) => {
        
        try {

            if(!req.authUser){
                return res.status(500).json({
                    msg:'Request does not have authUser, must validate token first'
                  });
            }  
        
            const { role, name } = req.authUser;            
        
            if( !roles.includes(role) ){
                return res.status(401).json({
                    msg:`Unauthorized user role: ${name} is ${req.authUser.role}, must be ${roles}`,          
                  });
            }
        
           
            next();
           
        
           } catch (error) {
        
              console.log(error)  
              return res.status(401).json({
                msg:'Unauthorized user',
                error
              });
           }
    }   
}

module.exports = {
    validateRole
}