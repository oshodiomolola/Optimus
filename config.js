const mongoose = require('mongoose');
require("dotenv").config();

function connectToDatabase() {
  mongoose.connect(process.env.CONNECTION_URL)
  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB Atlas successfully!")
  })
  mongoose.connection.on("error", (err) => {
    console.log(err)
    console.log("Database connection failed")
  })
}

module.exports = { connectToDatabase }