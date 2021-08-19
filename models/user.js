const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.MONGODB_URI;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Registration MongoDB successfully is connected"))
  .catch((err) => console.log(err));

// We are creating the userSchema here.

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
      unique: false,
    },
    email: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1024,
      unique: true,
    },
    login: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1024,
    },
    password: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1024,
    },
  })
);

exports.User = User;
