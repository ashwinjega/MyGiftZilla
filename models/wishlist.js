const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.MONGODB_URI;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Wishlist MongoDB successfully is connected"))
  .catch((err) => console.log(err));

// We are creating the wishlist scehma here.

const wishlist= mongoose.model(
  "wishlist",
  new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
      },
    id: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
    },
    title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255,
      unique: false,
    },
    price: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1024,
    },
    description: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1024,
    },
    category: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1024,
    },
    image: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1024,
      },
      
  })
);

exports.wishlist = wishlist;
