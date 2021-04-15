const express = require("express");
const { User } = require("../models/User");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200);
  return res.json({ success: true });
});

// 04.16 / 회원탈퇴
router.post("/:id/delete", (req, res) => {
  const email = req.params.id;
  User.findOne({ email: email }, (err, user) => {
    if (!user)
      return res.json({ deleteSuccess: false, message: "사용자 찾을 수 없음" });

    User.findOneAndDelete({ email: email }, (err, result) => {
      if (err) return res.json({ deleteSuccess: false, message: err });
      res.json({ deleteSuccess: true });
    });
  });
});

module.exports = router;
