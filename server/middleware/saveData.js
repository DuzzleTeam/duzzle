const { User } = require("../models/User");

let saveData = (req, res, next) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) {
      // 이미 가입되어있는 계정이라면
      if (err.code == 11000)
        return res.json({
          success: false,
          message: "이미 가입되어있는 계정입니다.",
        });
      return res.json({ success: false, err });
    }
  });
  next();
};

module.exports = { saveData };
