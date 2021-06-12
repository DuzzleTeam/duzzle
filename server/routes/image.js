const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// uploads 폴더 없으면 생성
fs.readdir("uploads", (err) => {
  if (err) {
    fs.mkdirSync("uploads");
  }
});

// 2021.06.03 (dayeon-choi)
fs.readdir("uploads/postImages", (err) => {
  if (err) {
    fs.mkdirSync("uploads/postImages");
  }
});

// 파일 저장 방식, 경로, 파일명 설정
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname); // 파일 확장자
      const timestamp = new Date().getTime().valueOf();
      cb(null, path.basename(file.originalname, ext) + timestamp + ext);
    },
  }),
  limits: { fileSize: 1026 * 1024 * 1024 },
});

// 2021.05.26 / 프로필 이미지 업로드 (juhyun-noh) 
router.post("/upload", upload.single("selectImg"), (req, res) => {
  res.json({ filename: `${req.file.filename}` });
});

// 2021.06.03 (dayeon-choi)
// PostWritingPage용 (게시글 작성) 파일 저장 방식, 경로, 파일명 설정
const uploadPost = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/postImages");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      const timestamp = new Date().getTime().valueOf();
      cb(null, path.basename(file.originalname, ext) + timestamp + ext);
    },
  }),
});

// 2021.06.03 (dayeon-choi)
//이미지 업로드 - PostWritingPage용 (게시글 작성)
router.post("/upload-post", uploadPost.array("selectImages"), (req, res) => {
  res.json({ filename: `${req.files.filename}` });
});

module.exports = router;
