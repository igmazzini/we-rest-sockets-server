const { Router } = require('express');
const { check } = require('express-validator');
const { getUser, postUser, putUser, deleteUser } = require('../controllers/user');
const { roleValidator, emailValidator, idValidator } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate-fields');



const router = Router();

router.get('/', getUser );

router.post('/',[
    check('name','Name is required').not().isEmpty(),
    check('password','Password is required').not().isEmpty(),
    check('password','Password must have at least 6 characters').isLength({ min: 6 }),
    check('role','Role is required').not().isEmpty(),
    //check('role','Role is not valid').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom( roleValidator ),    
    check('email','Email is required').not().isEmpty(),
    check('email','Invalid email').isEmail(),
    check('email').custom( emailValidator ),
    validateFields
] ,postUser );

router.put('/:id',[
    check('id','Invalid id').isMongoId(),
    check('id').custom( idValidator ),
    check('role','Role is required').not().isEmpty(),
    check('role').custom( roleValidator ), 
    validateFields
], putUser );

router.delete('/:id',[
    check('id','Invalid id').isMongoId(),
    check('id').custom( idValidator ),
    validateFields
], deleteUser );


module.exports = router;