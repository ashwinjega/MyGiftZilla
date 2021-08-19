const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const sha256 = require("crypto-js/sha256");

router.post("/", async (req, res) => {
  var error = "";
  let user = await User.findOne({ email: req.body.email });
  var s = req.body.email;
  try {
    if (user) {
      var email = req.body.email;

      const sgMail = require("@sendgrid/mail");
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: req.body.email,
        from: "GiftzillaSD@gmail.com",
        subject: "Reset Your Password!",
        text: "and easy to do anywhere, even with Node.js",
        html: '<a href="https://www.giftzilla.shop/NewPassword"<strong><button type="button">Click Me To Reset Password!</button></strong>',
      };
      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      error = "Incorrect Email";
    }
  } catch (e) {
    error = e.toString();
  }

  var ret = { error: error, email: email };
  res.status(200).json(ret);
});
module.exports = router;
