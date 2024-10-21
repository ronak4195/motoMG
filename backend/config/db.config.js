import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('MONGO_URI environment variable is not set.');
  process.exit(1); 
}

const db = mongoose.connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });


export default db;
