const {Router}= require('express');
const {check}= require('express-validator');
const router = Router();
const usersController= require('../controllers/users-controller');
const fileUpload = require('../middleware/file-upload');


router.get('/', usersController.getUsers);

router.post('/signup',
fileUpload.single("image"), 
[
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({min: 6})
]
,usersController.SignUp);

router.post('/login', usersController.LogIn);

module.exports= router;