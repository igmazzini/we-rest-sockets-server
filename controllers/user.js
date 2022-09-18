const  { request ,response  } = require('express');


const getUser = (req = request, res = response) => {

    const { param } = req.query;

    res.json({
        msg:'get Api - controller',
        param
    });
}

const postUser = (req = request, res = response) => {  

    const body = req.body;
   
    res.json({
        msg:`post Api - controller`,
        body
    });
}

const putUser = (req = request, res = response) => {   

    const { id } = req.params;   

    res.json({
        msg:'put Api - controller',
        id
    });
}
const deleteUser = (req = request, res = response) => {
    res.json({msg:'delete Api - controller'});
}



module.exports = {
    getUser,
    postUser,
    putUser,
    deleteUser
}