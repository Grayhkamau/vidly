const express =require("express");
const router = express.Router(); 
const lodash = require("lodash");
const btcrypt = require("bcryptjs");
const auth = require("../middleware/logger");
const adminAuth = require("../middleware/adminAuth");
const verify = require("../middleware/joiVerification");
const invalidId = require("../middleware/invalidIdError");
const {Usermodel,verifyUser} = require("../models/user-model");


router.post("/",verify(verifyUser),async(req,res)=>{
    let user = await Usermodel.findOne({email:req.body.email});
    if(user) return res.send("user already exists");

    user = new Usermodel(lodash.pick(req.body,["name","email","password","isAdmin"]));

    const salt = await btcrypt.genSalt(10);
    user.password = await btcrypt.hash(user.password, salt);

    await user.save();
    res.header("x-token", user.generateToken()).send(lodash.pick(user,["_id","name","password","email"]));
})

router.get("/me",auth,async(req,res)=>{
    let userId = req.user._id;
    let user = await Usermodel.findById(userId);
    if(!user) return res.status(400).send("user not found");
    res.send(user);
})

router.put("/:id",[auth,invalidId,verify(verifyUser)], async(req,res)=>{
        const user = await Usermodel.findByIdAndUpdate(req.params.id,{
            $set:{
                name:req.body.name,
            }
        },{new:true});
        res.send(user); 
})


router.delete("/:id",[auth,adminAuth,invalidId],async(req,res)=>{
        const user = await Usermodel.findByIdAndRemove(req.params.id)
        res.send(user); 
})

module.exports = router


