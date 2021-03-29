const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { User } = require("./models/User");
const bodyParser = require("body-parser");
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://duzzle:duzzle2021@duzzle.55imn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.status(200);
  res.send("hello world");
});

// 03.29 / 회원가입
app.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port);
