const mongoose = require("mongoose");

require("dotenv").config();

const Mongo_url_atlas =  process.env.MONGO_URL_ATLAS ;
const Mongo_url_local =  process.env.MONGO_URL_LOCAL ;

const connectDB = async () => {
  try {
      // Try connecting to MongoDB Atlas first
    const conn = await mongoose.connect(Mongo_url_atlas);
    console.log(`conntected : ${conn.connection.host}`);
  } catch (err) {
    // If connection to MongoDB Atlas fails, log the error
    console.log(`error in connecting mongodb atalas: ${err.message}`, );
      // Try connecting to local MongoDB as fallback
      try {
        const conn = await mongoose.connect(Mongo_url_local);
        console.log(`Connected to local MongoDB: ${conn.connection.host}`);
      } catch (err) {
        // Log error if both Atlas and local connection fail
        console.log(`Error connecting to local MongoDB: ${err.message}`);
      }
    }
  
};

module.exports= connectDB;
