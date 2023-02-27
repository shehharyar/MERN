const {Router}= require('express');
const router = Router();
const { check }=require('express-validator');

const placesController= require('../controllers/places-controller');

  

  router.get('/:pid', placesController.getPlacesById);
  
  router.get('/user/:uid', placesController.getPlacesByUserId);

  router.post('/',
  [
    check('title').not().isEmpty(),
    check('description').isLength({min: 5}),
    check('address').not().isEmpty()
  ] 
  
  ,placesController.createPlace);

  router.patch('/:pid',  [
    check('title').not().isEmpty(),
    check('description').isLength({min: 5}),
  ]
 ,placesController.updatePlaceById);

  router.delete('/:pid', placesController.deletePlaceById);
module.exports= router;