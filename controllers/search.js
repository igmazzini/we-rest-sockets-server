const  { request ,response  } = require('express');
const { User, Product, Category, Role } = require('../models');
const { ObjectId } = require('mongoose').Types;

const allowedCollections = [
   'user',
   'product',
   'category',
   'role',
];


const searchInUser = async ( query, res = response ) => {

   const isMongoId = ObjectId.isValid( query );

   if(isMongoId){

      const user = await User.findById( query );

      return res.json({
         results: (user) ? [user] : []
      });
   }

   const regexp = new RegExp( query, 'i' );

   const users = await User.find({ 
      $or:[{name: regexp},{email:regexp}],
      $and:[{status:true}]
    });

   return res.json({
      results: users
   });
}

const searchInProduct = async ( query, res = response ) => {

   const isMongoId = ObjectId.isValid( query );

   if(isMongoId){

      const product = await Product.findById( query )
      .populate('category','name' );

      return res.json({
         results: (product) ? [product] : []
      });
   }    

   const isNumber = /^\d+\.\d+$|^\d+$/.test(query);    

   let queryParams = [];

   if(!isNumber){

      const regexp = new RegExp(query, 'i' );

      queryParams = [{name: regexp},{description:regexp}];     

   }else {     

      queryParams = [{price:query},{stock:query}];      
   }

   const products = await Product.find({ 
      $or:queryParams,     
      $and:[{status:true}]
   })
   .populate('category','name' );

   return res.json({
      results: products
   });

   
}

const searchInRole = async ( query, res = response ) => {

   const isMongoId = ObjectId.isValid( query );

   if(isMongoId){

      const role = await Role.findById( query );

      return res.json({
         results: (role) ? [role] : []
      });
   }   

   const regexp = new RegExp( query, 'i' );

   const roles = await Role.find({ 
      $or:[{role: regexp}],
      $and:[{status:true}]
    });

   return res.json({
      results: roles
   });

   
}
const searchInCategory = async ( query, res = response ) => {

   const isMongoId = ObjectId.isValid( query );

   if(isMongoId){

      const category = await Category.findById( query );

      return res.json({
         results: (category) ? [category] : []
      });
   }   

   const regexp = new RegExp( query, 'i' );

   const categories = await Category.find({ 
      $or:[{name: regexp}],
      $and:[{status:true}]
    });

   return res.json({
      results: categories
   });

   
}

const search = async (req = request, res = response) => {   

   const { collection, query } = req.params;

   if( !allowedCollections.includes(collection) ){
       return res.status(400).json({
         ms:`${collection} not allowed, allowed collections are ${allowedCollections}`
       });
   }

   switch (collection) {
      case 'user':
         
         searchInUser(query, res);

         break;

      case 'product':

         searchInProduct(query, res);

         break;

      case 'category':

         searchInCategory( query, res);

         break;

      case 'role':
         
         searchInRole( query, res);

         break;
   
      default:
         res.status(500).json({
            msg:`Not contemplated collection: ${collection}`
         });
         break;
   } 
}



module.exports = {
   search
}