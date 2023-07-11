const fs = require('fs');
const express = require("express");
const path = require('path');
const bodyParser= require('body-parser');
const mongoose= require('mongoose');

const placesRouter= require('./routes/places-routes');
const usersRouter= require('./routes/user-routes');
const HttpError = require("./models/http-error");
const app = express();

app.use(bodyParser.json());
app.use('/uploads/images', express.static(path.join('uploads', 'images')));
app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
})

// middleware for places
app.use('/api/places',placesRouter);
app.use('/api/users', usersRouter );


app.use((req, res, next)=>{
  const error= new HttpError("Could not find this route", 404);
  throw error;
})

app.use((error, req, res, next) => {
  if(req.file){
    fs.unlink(req.file.path, err => {
      console.log(err);
    })
  }
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
  });
mongoose
.connect('mongodb+srv://sheharyar:Academind1234@cluster0.y3ld11c.mongodb.net/mern?retryWrites=true&w=majority')
.then(()=>{
  app.listen(5000)
  console.log("port 5000 ")
}
)
.catch(err => console.log(err))


