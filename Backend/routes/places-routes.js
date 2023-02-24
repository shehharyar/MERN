const express= require('express');

const router = express.Router();

router.get('/', (req, res, next)=>{
    console.log("GET request in PLACE")
    res.json({message: "It WOrks!"})
})

module.exports= router;