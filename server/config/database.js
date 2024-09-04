const mongoose = require("mongoose")
require("dotenv").config()

exports.connect = () =>{
    mongoose.connect(process.env.MANGODB_URL , ({
        useNewUrlParser:true,
        useUnifiedTopology:true
    }))
    .then(()=> console.log("Db connection succussfully"))
    .catch((e)=>{
        console.log("DB connection Failed")
        console.log(e)
        process.exit(1)
    })
}