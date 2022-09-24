const Role = require('../models/role');
const User = require('../models/user');

const roleValidator = async (role = '') =>{

    const existRole = await Role.findOne( {role} );

    if( !existRole ){
        throw new Error(`${role} does not exist`);
    }
}

const emailValidator = async( email = '') => {

    const emailExists = await User.findOne({ email });   

    if( emailExists ){
        throw new Error(`${email} already exists`);
    }

}
const idValidator = async( id = '') => {

    const idExists = await User.findById(id);   

    if( !idExists ){
        throw new Error(`ID: ${id} does not exists`);
    }

}





module.exports = {
    roleValidator,
    emailValidator,
    idValidator
}