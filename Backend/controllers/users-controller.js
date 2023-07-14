const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');
const User = require('../models/user');
const { validationResult}= require('express-validator');
const bcrypt= require('bcryptjs');  
const jwt = require('jsonwebtoken');

let DUMMY_USERS= [
    {
        id: "u1",
        name: "Brian YU",
        places: 3,
        email: "test@gmail.com",
        password: "test123"   
    },
];

const getUsers= async(req, res, next)=>{
  let users;
  try{
    users= await User.find({}, "-password")
  }
  catch(err){
    const error= new HttpError("fetching users failed, please try again later", 500)
   return next(error);
  }

  res.json({users: users.map(user => user.toObject({getters: true}))});
}

const LogIn= async(req, res, next)=>{

    const {email, password}= req.body;

    
       let existingUser;  
    
    try {
          existingUser= await User.findOne({email: email})
      } catch (err) {
        const error= new HttpError("Logging In failed, Please try later.", 5000);
        return next(error);
      }

      if(!existingUser){
        const error= new HttpError("Invalid credentials, could not log in you.", 401);
        return next(error)
      }
      // if (existingUser){
      //   const error= new HttpError("User exists already, login instead.", 5000)
      //   return next(error);
      // }
// const identifiedUser= DUMMY_USERS.find(u => u.email === email);
// // const passwordExits= 

// if(!identifiedUser || identifiedUser.password !== password ){
//     throw new HttpError("Could not identify user, Credentials seem to be wrong", 401);
// }
let isValidPassword= false;
try{
  isValidPassword= await bcrypt.compare(password, existingUser.password);
}catch(err){
  const error = new HttpError(
    'Could not log in, please check your credentials and try again.', 500);
    return next(error);
}

if(!isValidPassword){
  const error= new HttpError("Invalid credentials, could not log in you.", 403);
        return next(error)
}

let token;
      try{
        token = jwt.sign(
          { userId: existingUser.id, email: existingUser.email},
          'supersecret_dont_share',
          {expiresIn: '1h'}          
          )
      }catch(err){
        const error= new HttpError(
          "Logging In failed, plaease try again", 500);
            
          return next(error);
      }


res.json(
  {
   userId: existingUser.id,
   email: existingUser.email,
   token: token    
   });



}
const SignUp= async(req, res, next)=>{
    const errors= validationResult(req);
      console.log(errors);
      
      if(!errors.isEmpty()){
       return next( HttpError("Invalid Inputs passed, please check your data.", 422));
      }
    
    const {name, email, password, places} = req.body;
    let existingUser;  
    
    try {
          existingUser= await User.findOne({email: email})
      } catch (err) {
        const error= new HttpError("Signing Up failed, Please try later.", 422);
        return next(error);
      }
      if (existingUser){
        const error= new HttpError("User exists already, login instead.", 422)
        return next(error);
      }

  let hashedPassword;
  try{
    hashedPassword= await bcrypt.hash(password, 12);  
  }
  catch(err){
    const error = new HttpError('Could not create user, Please try again.', 500);
    return next(error);
  }

      const createdUser= new User({
        name,
        email,
        password: hashedPassword,
        image: req.file.path,
        places:[],

      });

      try {
        await createdUser.save();

      } catch (err) {
        const error= new HttpError(
        "Signing Up failed, plaease try again", 500);
            console.log(err);
        console.log(createdUser)     
        return next(error);
      } 

      let token;
      try{
        token = jwt.sign(
          { userId: createdUser.id, email: createdUser.email},
          'supersecret_dont_share',
          {expiresIn: '1h'}          
          )
      }catch(err){
        const error= new HttpError(
          "Signing Up failed, plaease try again", 500);
            
          return next(error);
      }
    // const hasUser= DUMMY_USERS.find(u => u.email === email);

    // if(hasUser){
    //     throw new HttpError("Could not create user, email already exists.", 422);
    // }

    // const createdUser={
    //     id: uuidv4(),
    //     name,
    //     email,
    //     password
    // };

    // DUMMY_USERS.push(createdUser);
    res.status(201).json({ userId: createdUser.id, email: createdUser.email, token: token});
}

exports.getUsers= getUsers;
exports.LogIn=LogIn;
exports.SignUp= SignUp;