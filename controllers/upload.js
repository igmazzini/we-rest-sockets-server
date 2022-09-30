const  { request ,response  } = require('express');
const { uploadFile } = require('../helpers');




const upload = async (req = request, res = response) => {   
   

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({msg:'No files were uploaded'});        
    }   


    uploadFile(req.files)
    .then( resp =>{
        res.json({
            msg:resp
        });
    })
    .catch( err => {
        res.status(400).json({
            msg:err.toString()
        });
    })


    

    
      
}



module.exports = {
    upload
}