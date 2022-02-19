const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {Genremodel,genreSchema} = require("./genre-model");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const movieSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    genre:{
        type:new mongoose.Schema({
            name:{
                type:String,
                required:true
            }
        }),
        required:true,
    },
    numberInStock:{
        type:Number,
        default:0,
        validate:{
        validator:function(v){
            return v>=0;
        },
        message:"number in stock can't be less than 0"
        },
        required:true
    },
    dailyRentalRate:{
        type:Number,
        // required:true,
        // default:0,
        validate:{
        validator:function(v){
            return v>0;
        },
        message:"daily rental rate can't be 0 "
        },
        required:function(){
            return this.numberInStock>0
        }

}})

const Moviemodel = mongoose.model("movie", movieSchema)

function verifyMovie(v){
    const schema = Joi.object({
        name:Joi.string().max(50).min(0),
        genreId:Joi.objectId().required(),
        dailyRentalRate:Joi.number(),
        numberInStock:Joi.number(),
    })
    return schema.validate(v);
}

module.exports.Moviemodel = Moviemodel;
module.exports.movieSchema = movieSchema;
module.exports.verifyMovie = verifyMovie;

