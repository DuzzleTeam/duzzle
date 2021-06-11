// 기본 제공 라이브러리
const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const http = require("http");
const https = require("https");

// npm install 라이브러리
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// 환경 변수
require("dotenv/config");
const PORT = process.env.PORT || 5000;
const config = require("./config/key");

// routes
const authRouter = require("./routes/auth");
const commentRouter = require("./routes/comment");
const postRouter = require("./routes/post");
const imgRouter = require("./routes/image");
const likeRouter = require("./routes/like");
const notificationRouter = require("./routes/notification");

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// static
// PRODUCT
if (process.env.NODE_ENV === "production") {
  console.log("production mode");
  app.use(express.static(path.join(__dirname, "../client/build")));
}
app.use("/", express.static(path.join(__dirname, "uploads")));

// Routing
app.use("/", authRouter);
app.use("/api", commentRouter);
app.use("/api", postRouter);
app.use("/api", imgRouter);
app.use("/api", likeRouter);
app.use("/api", notificationRouter);

// SPA 404 Error
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

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

if (process.env.NODE_ENV === "production") {
  // production mode
  // https
  // .pem key base url
  const KEY_URL = process.env.KEY_URL;
  const options = {
    key: fs.readFileSync(`${KEY_URL}/privkey.pem`),
    cert: fs.readFileSync(`${KEY_URL}/cert.pem`),
    ca: fs.readFileSync(`${KEY_URL}/chain.pem`),
  };

  https.createServer(options, app).listen(443, () => {
    console.log(`DUZZLE listening at port 443`);
  });
}

// production & development mode
// http
http.createServer(app).listen(PORT, () => {
  // DUZZLE listening at port 80 | 5000
  console.log(`DUZZLE listening at port ${PORT}`);
});
