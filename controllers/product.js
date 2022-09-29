const  { request ,response  } = require('express');
const { Product } = require('../models');


const getProducts = async (req = request, res = response) => {

    const { from = 0, limit = 5 } = req.query;   

    const filter = {status:true};

    const [ total, products ] = await Promise.all([
        Product.countDocuments(filter),
        Product.find(filter)
        .populate({ path: 'user', select: 'name email role -_id' })
        .populate({ path: 'category', select: 'name' })
        .skip(from)
        .limit(limit)
    ]);   

    res.json({
        total,  
        products,
               
    });
    
}
const getProductById = async (req = request, res = response) => {

    const { id } = req.params;  

    try {

        const product = await Product.findById(id)
        .populate({ path: 'user', select: 'name email role  -_id' })
        .populate({ path: 'category', select: 'name' });
    
        res.json({
            product           
        });
        
    } catch (error) {

        res.status(500).json({
            msg:error.toString()          
        });
    }

   
    
}

const createProduct = async (req = request, res = response) => {

    try {

        const name = req.body.name.toUpperCase();
        const category = req.body.category;       

        const productDB = await Product.findOne({ name });

        if(productDB){

            return res.status(400).json({
                msg: `Product ${name} already exists`            
            });
        }

        const data = {
            name,
            user: req.authUser._id,
            category,
            status:true,
            price: (req.body.price) ? req.body.price : 0,
            stock: (req.body.stock) ? req.body.stock : 1,
            description: (req.body.description) ? req.body.description : '',
        }

        const product = new Product(data);

        await product.save();

        res.status(201).json({
            product          
        });
        
    } catch (error) {
        
        res.status(400).json({
            msg:error.toString()          
        });
    }

    
    
}

const updateProduct = async (req = request, res = response) => {

    const { id } = req.params;  

    try {        
                
    
        const data = {

            user: req.authUser._id,
            category:req.body.category,
            price: (req.body.price) ? req.body.price : 0,
            stock: (req.body.stock) ? req.body.stock : 1,
            description: (req.body.description) ? req.body.description : '',
        }

        if(req.body.name){

            const name = req.body.name.toUpperCase();

            const productDB = await Product.findOne({ name });
    
            if(productDB){
        
                return res.status(400).json({
                    msg: `Product ${name} already exists`            
                });
            }else{

                data.name = name;
            }

        }     
    
        const product = await Product.findByIdAndUpdate(id,data,{new: true})
        .populate({ path: 'user', select: 'name email role  -_id' })
        .populate({ path: 'category', select: 'name' });
    
    
        res.json({
            product           
        });

    } catch (error) {

        res.status(400).json({
            msg:error.toString()           
        });
    }

   
    
}

const deleteProduct = async (req = request, res = response) => {

    const { id } = req.params;     


    try {

        const data = {
            user: req.authUser._id,
            status:false
        }

        const product = await Product.findByIdAndUpdate(id,data,{new: true})
        .populate({ path: 'user', select: 'name email role  -_id' })
        .populate({ path: 'category', select: 'name' });

        res.json({       
            product            
        });

    } catch (error) {
        res.status(500).json({       
            msg:error.toString()            
        });
    }
    
   
    
}



module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}