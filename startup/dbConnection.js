const mongoose = require('mongoose');
const config = require("config");

module.exports = async ()=>{
    const db = config.get("database.connection_string")
    try{
      await mongoose.connect(db);
      console.log(`connected to ${db}`);
    }
    catch(err){console.log(err.message)};

}