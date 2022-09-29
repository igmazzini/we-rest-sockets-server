const { Router } = require('express');
const { check } = require('express-validator');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/product');
const { productIdValidator, categoryIdValidator } = require('../helpers/db-validators');
const { validateFields, validateJWT, validateRole } = require('../middlewares');





const router = Router();

//Get all products
router.get('/', getProducts);

//Get product by id
router.get('/:id',[
    validateJWT,
    check('id','Invalid id').isMongoId(),
    check('id').custom( productIdValidator ),
    validateFields
],getProductById);

//Create product
router.post('/',[
    validateJWT,
    check('name','Name is required').not().isEmpty(),   
    check('category','category is required').not().isEmpty(),   
    check('category','Invalid id').isMongoId(),
    check('category').custom( categoryIdValidator ),    
    validateFields
], createProduct );

//Update product
router.put('/:id',[
    validateJWT,
    check('id','Invalid id').isMongoId(),    
    check('id').custom( productIdValidator ),
    check('category','Invalid id').isMongoId(),
/*     check('name','Name is required').not().isEmpty(),
    check('category','category is required').not().isEmpty(),   
    check('category','category is required').not().isEmpty(),
    check('category').custom( categoryIdValidator ),  */
    validateFields
], updateProduct );

//Delete product
router.delete('/:id',[
    validateJWT,
    validateRole('ADMIN_ROLE'),
    check('id','Invalid id').isMongoId(),
    check('id').custom( productIdValidator ),
    validateFields
], deleteProduct);




module.exports = router;