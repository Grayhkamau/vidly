const express = require("express");
const router = express.Router();
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi); 
const auth = require("../middleware/logger");
const verify = require("../middleware/joiVerification");
const {Rentalmodel} = require("../models/rental-model");
const {Moviemodel} = require('../models/movie-model');

router.post("/", [auth,verify(validateReturn)] , async(req,res)=>{
    const rental = await Rentalmodel.return(req.body.customerId, req.body.movieId)
    if(!rental) return res.status(404).send("no rental found");
    Rentalmodel.calcFee(res);
    await rental.save();

    await Moviemodel.findOneAndUpdate({_id:rental.movie._id}, {
        $set:{
            $inc:{numberInStock: 1}
        }
    });

    return res.status(200).send(rental);
})

function validateReturn(req){
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    })
    return schema.validate(req);
}

module.exports = router;