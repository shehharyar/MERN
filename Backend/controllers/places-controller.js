const HttpError= require('../models/http-error');  
const { validationResult}= require('express-validator');
const { v4: uuidv4 } = require('uuid');
const Place= require("../models/place");
// let DUMMY_PLACES = [
//     {
//       id: 'p1',
//       title: 'Empire State Building',
//       description: 'One of the most famous sky scrapers in the world!',
//       location: {
//         lat: 40.7484474,
//         lng: -73.9871516
//       },
//       address: '20 W 34th St, New York, NY 10001',
//       creator: 'u1'
//     }
//   ];

   const getPlacesById = async(req, res, next) => {
    const placeId = req.params.pid; // { pid: 'p1' }
    let place;
    try {
       place = await Place.findById(placeId);
    } catch (err) {
      const error= new HttpError("Something went wrong. Could not find a place", 500) 
      return next(error);
    }
  
    if (!place) {
      throw new HttpError('Could not find a place for the provided id.', 404);
    }
  
    res.json({ place: place.toObject({ geetters: true}) }); // => { place } => { place: place }
  };

  const getPlacesByUserId=(req, res, next) => {
    const userId = req.params.uid;
    const places = DUMMY_PLACES.filter(p => {
      return p.creator === userId;
    });
  
    if (!places || places.length === 0) { 
      return next( new HttpError('Could not find a place for the provided user id.', 404));
    }
  
    res.json({ places });
  };


  const createPlace= async ( req, res, next ) =>{
    const errors= validationResult(req);
      console.log(errors);
      
      if(!errors.isEmpty()){
         new HttpError("Invalid Inputs passed, please check your data.", 422);
      }

    const { title, description, coordinates, address, creator }= req.body;
    
        const createdPlace= new Place ({
         
          title,
          description, 
          image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1434&q=80", 
          address,
          location: coordinates,
          creator, 
        });
        
try {
  await createdPlace.save();
} catch (err) {
  const error= new HttpError(
  "Creating Place failed, plaease try again", 500);
  return next(error);
}
        res.status(201).send({place: createdPlace});
  }

  const updatePlaceById= async (req, res, next)=> {
    const errors= validationResult(req);
      console.log(errors);
      
      if(!errors.isEmpty()){
        throw new HttpError("Invalid Inputs passed, please check your data.", 422);
      }


    const {title, description}= req.body;
    const pid= req.params.pid;
      let place;

      try{
       place= await Place.findById(pid);
      }catch(e){
        const error= new HttpError("Something Wrong. Could not update plcae", 500);
        return next(error);
      }

    
    // const updatedPlace= {...DUMMY_PLACES.find(p => p.id === pid)};
    // const  placeIndex= DUMMY_PLACES.findIndex(p=> p.id ===pid);

    place.title= title;
    place.description= description;
    // DUMMY_PLACES[placeIndex]= updatedPlace;

    try {
      await place.save();
    } catch (err) {
      const error= new HttpError("SOmething went wrong. Could not update the place", 500);
      return next(error);
    }

    res.status(200).json({place: place.toObject({getters: true}) });
  }
  
  const deletePlaceById= async (req, res,next)=>{
    const placeId= req.params.pid;

    let place;
    try{
      place= await Place.findByIdAndDelete(placeId);
    }catch(e){
      const error= new HttpError("Something Wrong. Could not delete plcae", 500);
      return next(error);
    }

    // try{
    //   await place.remove();
    // }catch(e){
    //   const error= new HttpError("Something Wrong. Could not delete plcae", 500);
    //   return next(error);
    // }

    
    // if(!DUMMY_PLACES.find(p => p.id === placeId)){
    //   throw new HttpError("Could not find a place for that id", 404);
    // }

    // DUMMY_PLACES= DUMMY_PLACES.filter(p => p.id !== placeId);
    
    res.status(200).json({message : "Place Deleted"});
  };

  exports.getPlacesById= getPlacesById;
  exports.getPlacesByUserId= getPlacesByUserId;
  exports.createPlace= createPlace;
  exports.updatePlaceById= updatePlaceById;
  exports.deletePlaceById= deletePlaceById;