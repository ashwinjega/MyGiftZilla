const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.MONGODB_URI;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Friends MongoDB successfully is connected"))
  .catch((err) => console.log(err));

// We are creating the friends scehma

const friends = mongoose.model(
  "friends",
  new mongoose.Schema({
    useremail: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
      unique: true,
    },
    friendemail: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
      unique: true,
    },
  })
);

exports.friends = friends;
