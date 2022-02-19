const express = require("express");
const router = express.Router();
const lodash = require("lodash");
const auth = require("../middleware/logger");
const adminAuth = require("../middleware/adminAuth");
const invalidIdError = require("../middleware/invalidIdError");
const verify = require("../middleware/joiVerification");
const {Genremodel,verifyGenre} = require("../models/genre-model");

router.post("/",[auth,verify(verifyGenre)], async (req,res)=>{
    let genre = new Genremodel(lodash.pick(req.body,["name"]));

    await genre.save();
    res.send(genre)
})


router.get("/:id",invalidIdError, async (req,res)=>{
    let results = await Genremodel.findById(req.params.id);
    res.send(results)
})
router.get("/", async (req,res)=>{
    throw new Error("testing winston");
    let results = await Genremodel.find({});
    res.send(results)
})

router.put("/:id",[auth,verify(verifyGenre),invalidIdError], async(req,res)=>{
    let results = await Genremodel.findByIdAndUpdate(req.params.id,{
        $set:{
            name:req.body.name
        }
    },{new:true});
    res.send(results);
})



router.delete("/:id",[auth,adminAuth,invalidIdError], async(req,res)=>{
    let result = await Genremodel.findByIdAndRemove(req.params.id);
    res.send(result)
})

module.exports = router;