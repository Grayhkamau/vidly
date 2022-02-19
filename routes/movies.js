const express = require("express");
const router = express.Router();
const auth = require("../middleware/logger");
const adminAuth = require("../middleware/adminAuth");
const verify = require("../middleware/joiVerification");
const inValidIdError = require("../middleware/invalidIdError");
const {Moviemodel,verifyMovie} = require("../models/movie-model");
const {Genremodel} = require("../models/genre-model");
const invalidIdError = require("../middleware/invalidIdError");


router.post("/",[auth,verify(verifyMovie)], async(req,res)=>{
        let genre = await Genremodel.findById(req.body.genreId);
        if(!genre) return res.status(400).send("genre not found");

        let movie = new Moviemodel({
            name:req.body.name, 
            genre:{
                _id:genre._id,
                name:genre.name
            }
        });
        await movie.save();
        res.send(movie)
})

router.get("/:id",inValidIdError, async(req,res)=>{
        let result = await Moviemodel.findById(req.params.id);
        res.send(result)
})

router.put("/:id",[auth,invalidIdError,verify(verifyMovie)],async(req,res)=>{
        let movie = await Moviemodel.findById(req.params.id);
        if(!movie) return console.log("movie not found");
        let genre = await Genremodel.findById(req.body.genreId);
        if(!genre) return console.log("genre not found");
    
        $set:{
            movie.genre._id=req.body.genreId,
            movie.genre.name=genre.name
        } 
        
        movie = await movie.save();
        res.send(movie);
})

router.delete("/:id",[auth,adminAuth,invalidIdError],async(req,res)=>{
    let result = await Moviemodel.findByIdAndRemove(req.params.id);
    res.send(result);
})


module.exports = router;