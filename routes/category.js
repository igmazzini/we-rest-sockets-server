const { Router } = require('express');
const { check } = require('express-validator');
const { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/categories');
const { categoryIdValidator } = require('../helpers/db-validators');
const { validateFields, validateJWT, validateRole } = require('../middlewares');





const router = Router();

//Get all categories
router.get('/', getCategories);

//Get category by id
router.get('/:id',[
    validateJWT,
    check('id','Invalid id').isMongoId(),
    check('id').custom( categoryIdValidator ),
    validateFields
],getCategoryById);

//Create category
router.post('/',[
    check('name','Name is required').not().isEmpty(),
    validateJWT,
    validateFields
], createCategory);

//Update category
router.put('/:id',[
    validateJWT,
    check('id','Invalid id').isMongoId(),
    check('id').custom( categoryIdValidator ),
    check('name','Name is required').not().isEmpty(),
    validateFields
],updateCategory);

//Delete category
router.delete('/:id',[
    validateJWT,
    validateRole('ADMIN_ROLE'),
    check('id','Invalid id').isMongoId(),
    check('id').custom( categoryIdValidator ),
    validateFields
],deleteCategory);




module.exports = router;