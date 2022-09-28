const  { request ,response  } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/webtoken');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async (req = request, res = response) => {

    const { id_token } = req.body;   


    try {

        const {name, email, picture } = await googleVerify( id_token );

        let user = await User.findOne({ email });

        if( !user ){
            const data = {
                name,
                email,
                password:'123',
                role:'USER_ROLE',
                img:picture,
                google:true
            }

            user = new User(data);

            await user.save();

        }

        if( !user.status ){
            return res.status(401).json({
                msg:'User unauthorized'
            });
        }

        const token = await generateJWT(user.id);

        res.json({        
            user,
            token
        });
        
    } catch (error) {

        console.log(error);
        res.status(400).json({        
            msg:error.toString()
        });
        
    }

    
}


module.exports = {
    login,
    googleSignIn
}