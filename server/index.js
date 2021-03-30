const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { User } = require("./models/User");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// 03.28 / mongoDB 연결
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

// 03.30 / 로그인
app.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "가입되지 않은 계정입니다.",
      });
    }
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });
      }
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.listen(port);
