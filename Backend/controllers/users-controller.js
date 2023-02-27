const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');


let DUMMY_USERS= [
    {
        id: "u1",
        name: "Brian YU",
        places: 3,
        email: "test@gmail.com",
        password: "test123"   
    },
];

const getUsers=(req, res, next)=>{
  res.json({users: DUMMY_USERS})
}

const LogIn=(req, res, next)=>{

    const {email, password}= req.body;

const identifiedUser= DUMMY_USERS.find(u => u.email === email);
// const passwordExits= 

if(!identifiedUser || identifiedUser.password !== password ){
    throw new HttpError("Could not identify user, Credentials seem to be wrong", 401);
}

res.json({message: "Logged In, Successfully", identifiedUser});



}
const SignUp= (req, res, next)=>{
    const errors= validationResult(req);
      console.log(errors);
      
      if(!errors.isEmpty()){
        throw new HttpError("Invalid Inputs passed, please check your data.", 422);
      }
    
    const {name, email, password} = req.body;

    const hasUser= DUMMY_USERS.find(u => u.email === email);

    if(hasUser){
        throw new HttpError("Could not create user, email already exists.", 422);
    }

    const createdUser={
        id: uuidv4(),
        name,
        email,
        password
    };

    DUMMY_USERS.push(createdUser);
    res.status(201).json({message: "User created", createdUser})
}

exports.getUsers= getUsers;
exports.LogIn=LogIn;
exports.SignUp= SignUp;