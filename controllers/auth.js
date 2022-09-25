const  { request ,response  } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/webtoken');

const login = async (req = request, res = response) => {

    const { email, password } = req.body; 


    try {

       const user = await User.findOne({email});

       if(!user){
           return res.status(400).json({
            msg:`Invalid email: ${email} does not exists`
           });
       }

       if(!user.status){
            return res.status(400).json({
                msg:`${email} has been disabled`
            });
       }     

       if(!bcryptjs.compareSync(password, user.password)){
            return res.status(400).json({
                msg:`Invalid password`
            });
       }

       const token = await generateJWT(user.id);

       res.json({
        user,
        token
         
       });
        
    } catch (error) {
       
        res.status(500).json({
            error:`Login error:  ${error}`             
        });
    }      

    
}


module.exports = {
    login
}