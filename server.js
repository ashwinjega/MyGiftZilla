const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");
app.set("port", process.env.PORT || 5000);
const PORT = process.env.PORT || 5000;

const stripe = require("stripe")(
  "sk_test_51IkxFHC6q7MCzL7xHiw1mD9oYSUwYaBZL7aRdPM04QhYx0PVAVWvP3v9bH0IkcWXofRpia0RpTw8lo0HAwVyknGT00Zs0t2axO"
);

const { v4: uuidv4 } = require("uuid");
uuidv4();
//const uuid = require("uuid/v4");
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

require("dotenv").config();
const url = process.env.MONGODB_URI;
const mongoose = require("mongoose");
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB successfully is connected"))
  .catch((err) => console.log(err));
const Schema = mongoose.Schema;

//Register API is called here from frontend (Landingpage.js in pages)
const users = require("./routes/users");
app.use("/api/users", users);
const auth = require("./routes/auth");
app.use("/api/auth", auth);
const forgotpassword = require("./routes/forgotpassword");
app.use("/api/forgotpassword", forgotpassword);
const resetpassword = require("./routes/resetpassword");
app.use("/api/resetpassword", resetpassword);
const wishlist = require("./routes/wishlist");
app.use("/api/wishlist", wishlist);
const wishlistfind = require("./routes/wishlistfind");
app.use("/api/wishlistfind", wishlistfind);
const removewishlist = require("./routes/removewishlist");
app.use("/api/removewishlist", removewishlist);
const addevent = require("./routes/addevent");
app.use("/api/addevent", addevent);
const findevent = require("./routes/findevent");
app.use("/api/findevent", findevent);
const removeevent = require("./routes/removeevent");
app.use("/api/removeevent", removeevent);
const pullinfo = require("./routes/pullinfo");
app.use("/api/pullinfo", pullinfo);
const addfriend = require("./routes/addfriend");
app.use("/api/addfriend", addfriend);
const pullfriends = require("./routes/pullfriends");
app.use("/api/pullfriends", pullfriends);

app.post("/api/Google", async (req, res, next) => {
  var error = "";

  const { Id, name, email, Type } = req.body;

  const user = {
    FullName: name,
    UserID: Id,
    Email: email,
    Type: Type,
  };

  try {
    const db = client.db();
    const result = await db.collection("Users").insertOne(user);
  } catch (e) {
    error = "Email/Username already in use";
  }

  var ret = { error: error };
  res.status(200).json(ret);
});

app.post(
  "/api/loginFacebook",
  async (
    req,
    res,
    next //connecting to facebook.com
  ) => {
    var error = "";
    const db = client.db();
    const result = await db
      .collection("Users")
      .find({
        UserID: userID,
      })
      .toArray();

    var fn = "";
    var userID = "";
    fn = result[0].FirstName;
    userID = result[0].UserID;
    var ret = {
      firstName: fn,
      UserID: userID,
      error: "",
    };
    res.status(200).json(ret);
  }
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

//Server static assets if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  //console.log('Server listening on port ${PORT}.');
  console.log("Server listening on port" + PORT);
});
