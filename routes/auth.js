const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares');
const { login } = require('../controllers/auth');




const router = Router();

router.post('/login',[
    check('email','Email is required').not().isEmpty(),
    check('email','Invalid email').isEmail(),   
    check('password','Password is required').not().isEmpty(),    
    validateFields
], login );



module.exports = router;