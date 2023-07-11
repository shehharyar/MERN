const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');

module.exports = (req, res, next ) =>{
    try{
        if(req.method === 'OPTIONS'){
            return next();
        }
        const token = req.headers.authorization.split(' ')[1]; // Authorization : "Bearer Token"
        if(!token){
            throw new Error("Authentication failed!");
        }
        const decodedToken = jwt.verify(token, 'supersecret_dont_share');
        req.userData= { userId: decodedToken.userId };


    }catch(err){
        const error = new HttpError(' Authentication Failed! ' , 401 );
        return next(error);
    }
}