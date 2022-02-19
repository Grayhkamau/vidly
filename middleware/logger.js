const jwt = require("jsonwebtoken");
const config = require("config")

function auth(req,res,next){
    const token = req.header("x-token");
    if(!token) return res.status(401);

    try{
        const payload = jwt.verify(token, config.get("jwt-secret"));
        req.user = payload;
        next()
    }
    catch(ex){
        res.status(400).send("invalid token")
    }  
}

module.exports = auth;