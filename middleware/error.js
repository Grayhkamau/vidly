
const winston = require("winston");
winston.add(new winston.transports.Console({level:"error"}))

module.exports = (err,req,res,next)=>{
    winston.error(err.message);

    res.status(500).send("something failed");
}