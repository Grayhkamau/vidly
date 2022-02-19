const mongoose = require("mongoose");
const config = require("config");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:50,
        minLength:0
    },
    email:{
        type:String,
        // unique:true,
        required:true,
        maxLength:50,
        minLength:13
    },
    password:{
        type:String,
        required:true,
        maxLength:100,
        minLength:5 
    },
    isAdmin:{
        type:Boolean,
        required:true
    }
})

schema.methods.generateToken = function(){
    return jwt.sign({id:this._id,admin:this.isAdmin},config.get("jwt-secret"));
}

const Usermodel = mongoose.model("user", schema)

// function generateToken(model){
//     let token = jwt.sign({"_id":model._id,"isAdmin":model.isAdmin},"secret")
//     return token;
// }

function verifyUser(user){
    const schema = Joi.object({
        name:Joi.string().min(0).max(50).required(),
        email:Joi.required(),
        password:Joi.string().min(0).max(50).required(),
        isAdmin:Joi.boolean().required()
    })
    return schema.validate(user)
}
module.exports.Usermodel = Usermodel;
module.exports.verifyUser = verifyUser;
// module.exports.generateToken = generateToken;


