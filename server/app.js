const express = require("express");
const app = express();
const path = require("path");
const port = 5000;

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");

const authRouter = require("./routes/auth");
const commentRouter = require("./routes/comment");
const postRouter = require("./routes/post");
const imgRouter = require("./routes/image");
const likeRouter = require("./routes/like");
const notificationRouter = require("./routes/notification");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/api", commentRouter);
app.use("/api", postRouter);
app.use("/api", imgRouter);
app.use("/api", likeRouter);
app.use("/api", notificationRouter);

app.use("/", express.static(path.join(__dirname, "uploads")));

// 03.28 / mongoDB 연결
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.listen(port);
