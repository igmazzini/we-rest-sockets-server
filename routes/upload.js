const { Router } = require('express');
const { check } = require('express-validator');
const { upload, uploadFileByCollection, getFileByCollection, claundinaryUploadFileByCollection, getClaundinaryFileByCollection } = require('../controllers/upload');
const { allowedCollections } = require('../helpers');
const { validateFields, validateFile } = require('../middlewares');



const router = Router();

router.post('/',[     
    validateFile,  
    validateFields
], upload );

router.post('/:collection/:id',[   
    validateFile, 
    check('id', 'Invalid id').isMongoId(),
    check('collection').custom( c => allowedCollections(c,['user','product'])),   
    validateFields
], claundinaryUploadFileByCollection ); //uploadFileByCollection

router.get('/:collection/:id',[      
    check('id', 'Invalid id').isMongoId(),
    check('collection').custom( c => allowedCollections(c,['user','product'])),   
    validateFields
], getClaundinaryFileByCollection ); //getFileByCollection



module.exports = router;