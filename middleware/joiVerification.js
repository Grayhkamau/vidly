
module.exports = function(verify){
    return (req,res,next)=>{
        let {error} = verify(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        next();
    }
}

