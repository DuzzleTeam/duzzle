const express = require("express");
const { auth } = require("../middleware/auth");
const { saveData } = require("../middleware/saveData");
const { User } = require("../models/User");
const nodemailer = require("nodemailer");
const config = require("../config/key");
const crypto = require("crypto");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200);
});

// 04.08 / 입력받은 메일 암호화
function encrypt(plainEmail) {
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(config.encryption_key),
    config.vi
  );
  const result =
    cipher.update(plainEmail, "utf8", "base64") + cipher.final("base64");
  return result;
}
// 04.08 / 암호화된 이메일 복호화
function decrypt(encryptEmail) {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(config.encryption_key),
    config.vi
  );
  const result =
    decipher.update(encryptEmail, "base64", "utf8") + decipher.final("utf8");
  return result;
}

// 04.07 / 회원가입 인증 메일 보내기
router.post("/api/register", saveData, async (req, res) => {
  const smtpTransport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "DuzzleManager@gmail.com",
      pass: config.googlePwd,
    },
  });

  var hash = encrypt(req.body.email);
  var link =
    "http://localhost:5000/confirmRegister/?id=" + encodeURIComponent(hash);

  const mailOptions = {
    from: "DuzzleManager@gmail.com",
    to: req.body.email,
    subject: "Duzzle 회원가입 인증 메일",
    html: `<h1>Duzzle 회원가입 인증</h1><p><a href=${link}>${link}</a>`,
  };

  await smtpTransport.sendMail(mailOptions, (err, responses) => {
    if (err) {
      res.json(err);
      console.log(err);
    } else {
      res.json({ emailSendingSuccess: true });
    }
    smtpTransport.close();
  });
});

// 03.29 / 회원가입
router.get("/confirmRegister", (req, res) => {
  const email = decodeURIComponent(decrypt(req.query.id));
  User.findOne({ email: email }, (err, user) => {
    if (!user) return res.json({ registerSuccess: false, message: email });
    User.findOneAndUpdate(
      { email: email },
      { isCertified: true },
      (err, user) => {
        if (err) return res.json({ registerSucces: false, message: err });
        return res.status(200).send({
          registerSuccess: true,
          certificationSuccess: true,
        });
      }
    );
  });
});

// 03.30 / 로그인
router.post("/api/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "가입되지 않은 계정입니다.",
      });
    }
    // 이메일 인증이 되었다면
    if (user.isCertified == true) {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch) {
          return res.json({
            loginSuccess: false,
            message: "비밀번호가 틀렸습니다.",
          });
        }
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);

          res
            .cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
        });
      });
    } else {
      return res.json({
        loginSuccess: false,
      });
    }
  });
});

// 03.30 / 인증
router.get("/api/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
  });
});

// 03.30 / 로그아웃
router.get("/api/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      logoutSuccess: true,
    });
  });
});

module.exports = router;
