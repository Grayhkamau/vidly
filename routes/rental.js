const express = require("express");
const router = express.Router()
const lodash = require("lodash");
const {init,Task} = require("fawn");
init("mongodb://localhost/vidly");
const {customerModel}= require("../models/customer-model");
const {Moviemodel}= require("../models/movie-model");
const {Rentalmodel,verifyRental}= require("../models/rental-model");
const auth = require("../middleware/logger");
const verify = require("../middleware/joiVerification");



router.post("/",[auth,verify(verifyRental)],async(req,res)=>{
    let customer = await customerModel.findById(req.body.customerId);
    if(!customer) return res.status(400).send("invalid customer");
    let movie = await Moviemodel.findById(req.body.movieId);
    if(!movie) return res.status(404).send("invalid movie");

    if(movie.numberInStock === 0) return res.send(`${movie.name} is out of stock`);

    const rental = new Rentalmodel({
        customer:{
            _id:customer._id,
            name:customer.name,
            isGold:customer.isGold,
            phone:customer.phone
        },
        movie:{
            _id:movie._id,
            name:movie.name,
            dailyRentalRate:movie.dailyRentalRate
        }
    })

    try{
        new Task()
                .save("rentals",rental)
                .update("movies",{_id:movie._id},{$inc:{numberInStock:-1}})
                .run();
        res.send(lodash.pick(rental,["rentalNumber","customer","movie","dateRented","rentalRate"]));
    }
    catch(ex){res.send(ex.message).status(500);}
})


router.get("/",async (req,res)=>{
    let results = await Rentalmodel.find({});
    res.send(results) 
})

module.exports = router;
