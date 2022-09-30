
const { Schema, model } = require('mongoose');


/* {
    name:"",
    status:"",
    user:"",
    category:"",
    price:"",
    stock:"",
    description:"",
} */


const  ProductSchema = Schema({
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
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category',       
        require:[true,'Category is required']
    },
    price:{
        type:Number,
        default:0
    },
    stock:{
        type:Number,
        default:1
    },
    description:{
        type:String,        
    },
    img:{
        type:String,        
    }
   
});

ProductSchema.methods.toJSON = function(){

    const {__v,_id, ...product } = this.toObject();

    product.uid = _id;

    return product;
}




module.exports = model( 'Product', ProductSchema );