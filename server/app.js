const express = require("express");
const app = express();
const path = require("path");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const history = require("connect-history-api-fallback");
require("dotenv/config");
const PORT = process.env.PORT || 5000;
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

// PRODUCT
if (process.env.NODE_ENV === "production") {
  console.log("production mode");
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.use("/", authRouter);
app.use("/api", commentRouter);
app.use("/api", postRouter);
app.use("/api", imgRouter);
app.use("/api", likeRouter);
app.use("/api", notificationRouter);

app.use("/", express.static(path.join(__dirname, "uploads")));

// 404 error ...
app.use(history());

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

app.listen(PORT, () => console.log(`port ${PORT}`));
