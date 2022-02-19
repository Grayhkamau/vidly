const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const {Usermodel} = require("../models/user-model");

router.post('/',async (req,res)=>{
   const {error} = verify(req.body);
   if(error) return res.status(400).send(error.details[0].message);

   const user = await Usermodel.findOne({email:req.body.email});
   if(!user) return res.status(400).send("invalid email or password");

   const isPasswordValid = bcrypt.compare(req.body.password, user.password);
   if(!isPasswordValid) return res.status(400).send("invalid email or password")

    res.send(user.generateToken());
})


function verify(user){
    const schema = Joi.object({
        password:Joi.string().min(5).max(50).required(),
        email:Joi.email().min(13).max(50).required(),
    })
    return schema.validate(user);
}

module.exports = router;