const {Router}= require('express');
const router = Router();
const { check }=require('express-validator');
const fileUpload = require('../middleware/file-upload');
const placesController= require('../controllers/places-controller');
const checkAuth = require('../middleware/check-auth');
  

  router.get('/:pid', placesController.getPlacesById);
  
  router.get('/user/:uid', placesController.getPlacesByUserId);

  router.use(checkAuth);

  router.post('/',
  fileUpload.single("image"),
  [
    check('title').not().isEmpty(),
    check('description').isLength({min: 5}),
    check('address').not().isEmpty()
  ] 
  
  ,placesController.createPlace);

  router.patch('/:pid',
  fileUpload.single("image"),
  [
    check('title').not().isEmpty(),
    check('description').isLength({min: 5}),
  ]
 ,placesController.updatePlaceById);

  router.delete('/:pid', placesController.deletePlaceById);
module.exports= router;