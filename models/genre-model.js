const mongoose=require("mongoose");
const Joi = require("joi"); 

const genreSchema = new mongoose.Schema({
    name:{
        type:String,
        maxlength:50,
        minlength:3
    }
})

const Genremodel = mongoose.model("genre", genreSchema)

function verifyGenre(v){
    const schema = Joi.object({
        name:Joi.string().max(50).min(3).required(),
    })
    return schema.validate(v)
}

module.exports.Genremodel=Genremodel;
module.exports.verifyGenre=verifyGenre;
module.exports.genreSchema=genreSchema;

