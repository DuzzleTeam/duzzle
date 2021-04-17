const { User } = require("../models/User");

const saveUser = (req, res, next) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
  });
  next();
};

module.exports = { saveUser };
