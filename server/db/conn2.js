const dotenv = require('dotenv');

const mongoose = require('mongoose');
dotenv.config({path: "./config.env"})

// Connect to mongoDb Atlas database
const DB = "mongodb+srv://admiease:Indiaharsh2009@admiease1.5h3yu.mongodb.net/Amity?retryWrites=true&w=majority";

mongoose.connect(DB).then(() =>{
    console.log("connection successful")
}).catch((err) =>{
    console.log("Connection string error in const DB", err)
})