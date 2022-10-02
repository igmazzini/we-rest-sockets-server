const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields, validateJWT } = require('../middlewares');
const { login, googleSignIn, authValidateToken } = require('../controllers/auth');




const router = Router();

router.post('/login',[
    check('email','Email is required').not().isEmpty(),
    check('email','Invalid email').isEmail(),   
    check('password','Password is required').not().isEmpty(),    
    validateFields
], login );

router.post('/google',[
    //check('id_token','Token is required').not().isEmpty(),     
    validateFields
], googleSignIn );

router.get('/',[
    validateJWT,     
    validateFields
], authValidateToken );



module.exports = router;