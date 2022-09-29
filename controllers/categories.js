const  { request ,response  } = require('express');
const { Category } = require('../models');


const getCategories = async (req = request, res = response) => {

    const { from = 0, limit = 5 } = req.query;   

    const filter = {status:true};

    const [ total, categories ] = await Promise.all([
        Category.countDocuments(filter),
        Category.find(filter)
        .populate({ path: 'user', select: 'name email role -_id' })
        .skip(from)
        .limit(limit)
    ]);   

    res.json({
        total,  
        categories,
               
    });
    
}
const getCategoryById = async (req = request, res = response) => {

    const { id } = req.params;  

    try {

        const category = await Category.findById(id)
        .populate({ path: 'user', select: 'name email role  -_id' });
    
        res.json({
            category           
        });
        
    } catch (error) {

        res.status(500).json({
            msg:error.toString()          
        });
    }

   
    
}

const createCategory = async (req = request, res = response) => {

    try {

        const name = req.body.name.toUpperCase();

        const categoryDB = await Category.findOne({ name });

        if(categoryDB){

            return res.status(400).json({
                msg: `Category ${name} already exists`            
            });
        }

        const data = {
            name,
            user: req.authUser._id,
            status:true
        }

        const category = new Category(data);

        await category.save();

        res.status(201).json({
            category          
        });
        
    } catch (error) {
        
        res.status(400).json({
            msg:error.toString()          
        });
    }

    
    
}

const updateCategory = async (req = request, res = response) => {

    const { id } = req.params;  

    try {

        const name = req.body.name.toUpperCase();

        const categoryDB = await Category.findOne({ name });
    
        if(categoryDB){
    
            return res.status(400).json({
                msg: `Category ${name} already exists`            
            });
        }
    
        const data = {
            name,
            user: req.authUser._id
        }
    
        const category = await Category.findByIdAndUpdate(id,data,{new: true})
        .populate({ path: 'user', select: 'name email role  -_id' });
    
    
        res.json({
            category           
        });

    } catch (error) {

        res.status(400).json({
            msg:error.toString()           
        });
    }

   
    
}

const deleteCategory = async (req = request, res = response) => {

    const { id } = req.params;     


    try {

        const data = {
            user: req.authUser._id,
            status:false
        }

        const category = await Category.findByIdAndUpdate(id,data,{new: true})
        .populate({ path: 'user', select: 'name email role  -_id' });

        res.json({       
            category            
        });

    } catch (error) {
        res.status(500).json({       
            msg:error.toString()            
        });
    }
    
   
    
}



module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}