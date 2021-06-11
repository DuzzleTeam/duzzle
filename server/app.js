const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const https = require("https");

require("dotenv/config");
const PORT = process.env.PORT || 5000;
const config = require("./config/key");
// HTTPS
const KEY_URL = process.env.KEY_URL;
const options =
  process.env.NODE_ENV === "production"
    ? {
        key: fs.readFileSync(path.join(__dirname, `${KEY_URL}/privkey.pem`)),
        cert: fs.readFileSync(path.join(__dirname, `${KEY_URL}/cert.pem`)),
        ca: fs.readFileSync(path.join(__dirname, `${KEY_URL}/fullchain.pem`)),
      }
    : null;

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

app.use("/", authRouter);
app.use("/api", commentRouter);
app.use("/api", postRouter);
app.use("/api", imgRouter);
app.use("/api", likeRouter);
app.use("/api", notificationRouter);

app.use("/", express.static(path.join(__dirname, "uploads")));

// 404 error ...
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

// app.listen(PORT, () => console.log(`port ${PORT}`));
// HTTPS
option &&
  https.createServer(option, app).listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
  });

option
  ? app
      .get((req, res) => {
        // HTTP 접속 시 HTTPS로 redirect
        res.writeHead(301, {
          Location: `https://${req.headers["host"]}${req.url}`,
        });
        res.end();
      })
      .listen(PORT, () => {
        console.log(`Server is running at port ${PORT}`);
      })
  : // development 환경일 경우 HTTP 서버만 구동
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    });
