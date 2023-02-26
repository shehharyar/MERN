const express= require('express');
const router = express.Router();
const placesController= require('../controllers/places-controller');

  

  router.get('/:pid', placesController.getPlacesById);
  
  router.get('/user/:uid', placesController.getPlacesByUserId);

module.exports= router;