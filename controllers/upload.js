const path = require('path');
const fs = require('fs');
const  { request ,response  } = require('express');
const { uploadFile } = require('../helpers');
const { User, Product } = require('../models');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);





const upload = async (req = request, res = response) => {      

   
    try {

        const msg = await  uploadFile({files:req.files});
        res.json({
            msg
        });
        
    } catch (error) {

        res.status(400).json({
            msg:error.toString()
        });
    }
    
      
}

const uploadFileByCollection = async (req = request, res = response) => {   
   
    

    const { collection, id } = req.params;

    let model;

    switch (collection) {
        case 'user':

            model = await User.findById(id);

            if( !model ){
                return res.status(400).json({
                    msg:`No user found with this id: ${id}`
                });
            }

            break;
        case 'product':

            model = await Product.findById(id);

            if( !model ){
                return res.status(400).json({
                    msg:`No product found with this id: ${id}`
                });
            }

            break;       
    
        default:
            return res.status(500).json({
                msg:`Collection ${collection} not contemplated`
            });
          
    }   
    
   

    try {

        if( model.img ){

            const imagePath = path.join(__dirname,'../uploads', collection, model.img);

            if( fs.existsSync(imagePath) ){
                fs.unlinkSync( imagePath )
            }

        }

        const fileName = await  uploadFile({files:req.files,allowedExtensions:['png','jpg','jpeg'], folder: collection });       

        model.img = fileName;

        await model.save();

        res.json({
            model
        });
        
    } catch (error) {

        res.status(400).json({
            msg:error.toString()
        });
    }
    
      
}

const getFileByCollection = async (req = request, res = response) => {   
   
    

    const { collection, id } = req.params;

    let model;

    switch (collection) {
        case 'user':

            model = await User.findById(id);

            if( !model ){
                return res.status(400).json({
                    msg:`No user found with this id: ${id}`
                });
            }

            break;
        case 'product':

            model = await Product.findById(id);

            if( !model ){
                return res.status(400).json({
                    msg:`No product found with this id: ${id}`
                });
            }

            break;       
    
        default:
            return res.status(500).json({
                msg:`Collection ${collection} not contemplated`
            });
          
    }   
    
   

    try {

        if( model.img ){

            const imagePath = path.join(__dirname,'../uploads', collection, model.img);

            if( fs.existsSync(imagePath) ){

               return res.sendFile(imagePath);
               
            }  

        } 
        
        res.sendFile(path.join(__dirname,'../assets', 'no-image.jpg'))

     
        
    } catch (error) {

        res.status(400).json({
            msg:error.toString()
        });
    }
    
      
}

const claundinaryUploadFileByCollection = async (req = request, res = response) => {   
   
    

    const { collection, id } = req.params;

    let model;

    switch (collection) {
        case 'user':

            model = await User.findById(id);

            if( !model ){
                return res.status(400).json({
                    msg:`No user found with this id: ${id}`
                });
            }

            break;
        case 'product':

            model = await Product.findById(id);

            if( !model ){
                return res.status(400).json({
                    msg:`No product found with this id: ${id}`
                });
            }

            break;       
    
        default:
            return res.status(500).json({
                msg:`Collection ${collection} not contemplated`
            });
          
    }   
    
   

    try {

        if( model.img ){
           
            const imageNameArr = model.img.split('/');
            
            const imageName = imageNameArr[imageNameArr.length - 1];
            
            const [ imageId ] = imageName.split('.');          
           
            await cloudinary.uploader.destroy( imageId );            

        }
        
        const { tempFilePath } = req.files.file;

        const { secure_url } = await cloudinary.uploader.upload(tempFilePath);           

        model.img = secure_url;

        await model.save();

        res.json({
            model
        });
        
    } catch (error) {

        res.status(400).json({
            msg:error.toString()
        });
    }
    
      
}
const getClaundinaryFileByCollection = async (req = request, res = response) => {   
   
    

    const { collection, id } = req.params;

    let model;

    switch (collection) {
        case 'user':

            model = await User.findById(id);

            if( !model ){
                return res.status(400).json({
                    msg:`No user found with this id: ${id}`
                });
            }

            break;
        case 'product':

            model = await Product.findById(id);

            if( !model ){
                return res.status(400).json({
                    msg:`No product found with this id: ${id}`
                });
            }

            break;       
    
        default:
            return res.status(500).json({
                msg:`Collection ${collection} not contemplated`
            });
          
    }   
    
   

    try {

        if( model.img ){

           return res.send(model.img)
        } 
        
        res.sendFile(path.join(__dirname,'../assets', 'no-image.jpg'))

     
        
    } catch (error) {

        res.status(400).json({
            msg:error.toString()
        });
    }
    
      
}



module.exports = {
    upload,
    uploadFileByCollection,
    getFileByCollection,
    claundinaryUploadFileByCollection,
    getClaundinaryFileByCollection
}