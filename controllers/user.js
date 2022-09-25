const  { request ,response  } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');



const getUser = async (req = request, res = response) => {

    const { from = 0, limit = 5 } = req.query;   

    const filter = {status:true};

    const [ total, users ] = await Promise.all([
        User.countDocuments(filter),
        User.find(filter)
        .skip(from)
        .limit(limit)
    ]);    

    res.json({
        total,
        users
        
    });
}

const postUser = async (req = request, res = response) => {  
    

    const { name, password, email, role } = req.body;  

    const user = new User({ name, password, email, role });   

    const salt = bcryptjs.genSaltSync();

    user.password = bcryptjs.hashSync(password, salt);

    await user.save();
   
    res.json({       
        user
    });
}

const putUser = async (req = request, res = response) => {   

    const { id } = req.params;  
    const { _id,password, google,...bodyParams } = req.body; 

    if( password ){

        const salt = bcryptjs.genSaltSync();

        bodyParams.password = bcryptjs.hashSync(password, salt);
    }
    

    const user = await User.findByIdAndUpdate(id,bodyParams,{new: true}); 

    res.json({
        user
    });
}
const deleteUser = async (req = request, res = response) => {

    const { id } = req.params; 

    //const user = await User.findByIdAndDelete(id);   
    
    const user = await User.findByIdAndUpdate(id,{status:false},{new: true} );

    const authUser = req.authUser;

    res.json({
        user,        
    });
}



module.exports = {
    getUser,
    postUser,
    putUser,
    deleteUser
}