const { Router } = require('express');
const { check } = require('express-validator');
const { upload } = require('../controllers/upload');
const { validateFields } = require('../middlewares');



const router = Router();

router.post('/',[       
    validateFields
], upload );



module.exports = router;