const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 5000;

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

app.listen(port);
