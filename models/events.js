const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.MONGODB_URI;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Events MongoDB successfully is connected"))
  .catch((err) => console.log(err));

// We are creating the wishlist scehma here.

const events= mongoose.model(
  "events",
  new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
      },
      
    start: {
      type: Date
    },
    
    title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
      unique: false,
    },
    
    end: {
      type: Date
    },
      
  })
);

exports.events = events;
