const jwt = require('jsonwebtoken');
const config = require("config")

function adminAuth(req,res,next){
    if(req.user.isAdmin===false) return res.status(403).send("access denied");
    next();
    // let token = req.header("x-token");
    // if(!token) return res.status(401).send("token not found");
    // try{
    //     let payload = jwt.verify(token,config.get("jwt-secret"));
    //     if(payload.isAdmin===true){
    //      next();
    //     }
    // }
    // catch(ex){
    //     res.status(400).send("invalid token");
    // }; 
}

module.exports = adminAuth;