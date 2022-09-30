const { Category, Role, User, Product } = require('../models');


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
const userIdValidator = async( id = '') => {

    const idExists = await User.findById(id);   

    if( !idExists ){
        throw new Error(`ID: ${id} does not exists`);
    }

}

const categoryIdValidator = async( id = '') => {

    const idExists = await Category.findById(id);   

    if( !idExists ){
        throw new Error(`ID: ${id} does not exists`);
    }

}
const productIdValidator = async( id = '') => {

    const idExists = await  Product.findById(id);   

    if( !idExists ){
        throw new Error(`ID: ${id} does not exists`);
    }

}
const allowedCollections = async(collection = '', collections = []) => {   

    if( !collections.includes(collection) ){
        throw new Error(`Collection: '${collection}' is not allowed, allowed collections: ${collections}`);
    }
    

}







module.exports = {
    roleValidator,
    emailValidator,
    userIdValidator,
    categoryIdValidator,
    productIdValidator,
    allowedCollections
}