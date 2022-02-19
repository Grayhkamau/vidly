const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const rentalSchema = new mongoose.Schema({
    customer:{
        type:new mongoose.Schema({
            name:{
                type:String,
                required:true
            },
            isGold:{
                type:Boolean,
                required:true,
                default:false
            },
            phone:{
                type:Number,
                required:true
            }
        }),
        required:true
    },
    movie:{
        type:new mongoose.Schema({
            name:{
                type:String,
                required:true,
                trim:true,
                maxLength:50,
                minLength:0
            },
            dailyRentalRate:{
                type:Number,
                min:0,
                required:true
            }
        }),
        required:true
    },
    dateRented:{
        type:Date
    },
    dateReturned:{
        type:Date,
    },
    rentalFee:{
        type:Number,
        min:0,
    }
})

rentalSchema.statics.return = function(customerId, movieId){
    return this.findOne({
                "customer._id":customerId,
                "movie._id":movieId
            })
}

rentalSchema.methods.calcFee = function(res){
    if(this.dateReturned) return res.status(400).send("rental already processed");

    this.dateReturned = new Date();

    let daysRented = Math.floor((this.dateReturned - this.dateRented)/86400000);

    this.rentalFee = daysRented * this.movie.dailyRentalRate;
}

const Rentalmodel = mongoose.model("rental", rentalSchema)


function verifyRental(v){
    const schema = Joi.object({
        customerId:Joi.objectId().required(),
        movieId:Joi.objectId().required()
    })
    return schema.validate(v)
}

module.exports.verifyRental=verifyRental;
module.exports.Rentalmodel=Rentalmodel;
