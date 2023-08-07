//A function for connect to database
const mongoose = require("mongoose"); //package that makes mongodb easy
const mongoURL = "mongodb://127.0.0.1:27017/sweetbowl"; //mongodb database url
const connectToMongo = () => {
  //hear we use then syntex for callback function
  mongoose.connect(mongoURL).then(() => {
    console.log("mongodb conected...");
  });
};
module.exports = connectToMongo; //export the function
