const dotenv = require('dotenv');

const mongoose = require('mongoose');
dotenv.config({path: "./config.env"})

// Connect to mongoDb Atlas database
const DB = "mongodb+srv://locoshopuser:Indiaharsh2009@cluster0.51bdh74.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(DB).then(() =>{
    console.log("connection successful")
}).catch((err) =>{
    console.log("Connection string error in const DB", err)
})

