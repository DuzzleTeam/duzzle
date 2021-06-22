const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const { toNamespacedPath } = require("path");
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

// 프로필 사진용 파일 저장 방식, 경로, 파일명 설정
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname); // 파일 확장자
      const timestamp = new Date().getTime().valueOf();
      const filename = path.basename(file.originalname, ext) + timestamp + ext;
      cb(null, filename);
    },
  }),
});

// 2021.06.03 (dayeon-choi)
// PostWritingPage용 (게시글 작성) 파일 저장 방식, 경로, 파일명 설정
const uploadpost = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/postImages/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      const timestamp = new Date().getTime().valueOf();
      const filename = path.basename(file.originalname, ext) + timestamp + ext;
      cb(null, filename);
    },
  }),
});

// 2021.05.26 / 프로필 이미지 업로드 (juhyun-noh)
router.post("/upload", upload.single("selectImg"), (req, res) => {
  try {
    sharp(req.file.path)
      .resize({ width: 600 }) // 비율을 유지하며 가로 줄이기
      .withMetadata()
      .toBuffer((err, buffer) => {
        if (err) throw err;
        // 압축된 파일 새로 저장
        fs.writeFile(req.file.path, buffer, (err) => {
          if (err) throw err;
        });
      });
  } catch (err) {
    console.log(err);
  }
  res.json({ filename: `${req.file.filename}` });
});

// 2021.06.03 (dayeon-choi)
//이미지 업로드 - PostWritingPage용 이미지 여러개용 (게시글 작성)
router.post("/uploadposts", uploadpost.array("selectImages"), (req, res) => {
  let fileNames = [];
  req.files.map((file) => fileNames.push(file.filename));
  res.json({ fileNames: fileNames });
});

// 2021.06.20 (dayeon-choi)
// 이미지 업로드 - postWritingPage 이미지 하나용 (게시글 작성)
router.post("/uploadpost", uploadpost.single("selectImage"), (req, res) => {
  res.json({ filename: `${req.file.filename}` });
});
module.exports = router;
