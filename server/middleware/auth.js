const { User } = require("../models/User");

const auth = (req, res, next) => {
  const token = req.cookies.x_auth;
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    req.token = token;
    req.user = user;
    next();
  });
};

// 레벨
// type: post or comment
// flag: true => +
// flag: false => -
const level = (type, flag) => {
  // return middleware
  return async (req, res, next) => {
    // 현재 접속 유저 (요청한 유저)
    const { user } = req;

    if (flag && user.level === 8) {
      // 만렙이면
      next();
    }

    if (type === "post") {
      // 게시글 20%
      user.level += (flag ? 1 : -1) * 0.2;
    } else if (type === "comment") {
      // 댓글 5%
      user.level += (flag ? 1 : -1) * 0.05;
    } else {
      console.log("type error");
    }

    try {
      // 변경 사항 저장
      await user.save();
      next();
    } catch (e) {
      // save 실패
      console.log(e);
      return res.statue(500).json({ message: "레벨에 오류가 발생했습니다." });
    }
  };
};

module.exports = { auth, level };
