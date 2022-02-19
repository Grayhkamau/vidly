const mongoose = require("mongoose");
const Joi = require("joi");
//customer
const customerSchema = new mongoose.Schema({
    isGold:{
        type:Boolean,
        required:true
    },
    name:String,
    phone:Number
})
const CustomerModel = mongoose.model("customer", customerSchema)

function verifyCustomer(v){
    const schema = Joi.object({
        isGold:Joi.boolean().required(),
        name:Joi.string().required(),
        phone:Joi.number().required()
    })
    return schema.validate(v);
}



module.exports.customerModel = CustomerModel;
module.exports.verifyCustomer = verifyCustomer;
module.exports.customerSchema = customerSchema;

