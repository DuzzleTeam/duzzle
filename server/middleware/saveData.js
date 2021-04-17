const { User } = require("../models/User");

let saveData = (req, res, next) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
  });
  next();
};

module.exports = { saveData };
