const winston = require("winston");
require("express-async-errors");
const express = require('express');
const app = express();
const debug = require('debug')('app:startup');
const config = require('config')
const morgan = require('morgan');

// process.on("unhandledRejection", (rejection)=>{
//     console.log(rejection.message,rejection)
//     winston.info(rejection);
// })
// process.on("uncaughtException", (ex)=>{
//     winston.Error(ex.message, ex);
// })

winston.add(new winston.transports.File({
    filename:"errors.log",
     level:"error",
     handleExceptions:true
}))
winston.rejections.handle(
    new winston.transports.File({filename:"rejections.log"})
)


const p = Promise.reject(new Error("yes"));
p.then(()=>{console.log("yes")});

if(config.get("jwt-secret")===''){
    process.exit(1);
}

require("./startup/dbConnection")()
require("./startup/routes")(app);
 

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    debug(`morgan enabled...`);
}



const port = process.env.PORT || 3000;
const server = app.listen(port, ()=>{console.log("listening on port "+ port)});

module.exports = server;


