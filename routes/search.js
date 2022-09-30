const { Router } = require('express');
const { check } = require('express-validator');
const { search } = require('../controllers/search');
const { validateFields } = require('../middlewares');



const router = Router();

router.get('/:collection/:query',[       
    check('query','Search query is required').not().isEmpty(), 
    validateFields
], search );



module.exports = router;