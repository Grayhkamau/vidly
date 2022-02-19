const express = require("express");
const router = express.Router();
const lodash = require("lodash");
const auth = require("../middleware/logger");
const verify = require("../middleware/joiVerification");
const invalidId = require("../middleware/invalidIdError");
const {customerModel,verifyCustomer} = require("../models/customer-model");


router.post("/", verify(verifyCustomer), async(req,res)=>{
    let customer = new customerModel(lodash.pick(req.body,["isGold","name","phone"]));

    await customer.save();
    res.send(customer);   
})

router.get("/", async(req,res)=>{
    let customers = await customerModel.find({});
    res.send(customers);
})

router.get("/:id", invalidId, async(req,res)=>{
    let customer = await customerModel.findById(req.params.id)
    if(!customer){
        res.status(404).send("record not found")
    }
    res.send(result)
})

router.put("/:id",[auth,invalidId,verify(verifyCustomer)], async(req,res)=>{
    let result = await customerModel.findByIdAndUpdate(req.params.id,{
        $set:{
            name:req.body.name,
        }
    },{new:true})
    res.send(result)
})

module.exports = router;