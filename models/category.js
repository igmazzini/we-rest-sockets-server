
const { Schema, model } = require('mongoose');


/* {
    name:""
    status:""
    user:""
} */


const  CategorySchema = Schema({
    name:{
        type:String,
        required:[true, 'Name is required'],
        unique:true
    },
    status:{
        type:Boolean,
        default:true,
        require:[true,'Status is required']
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',       
        require:[true,'User is required']
    },
   
});

CategorySchema.methods.toJSON = function(){

    const {__v,_id, ...category } = this.toObject();

    category.uid = _id;

    return category;
}




module.exports = model( 'Category', CategorySchema );