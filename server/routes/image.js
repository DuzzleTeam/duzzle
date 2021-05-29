// 05.26 / 이미지 업로드
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// uploads 폴더 없으면 생성
fs.readdir('uploads', (err) => {
    if(err) {
        fs.mkdirSync('uploads');
    }
});

// 파일 저장 방식, 경로, 파일명 설정
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);    // 파일 확장자
            const timestamp = new Date().getTime().valueOf();
            cb(null, path.basename(file.originalname, ext) + timestamp + ext);
        },
    }),
    // limits: { fileSize: 5 * 1024 * 1024 },
});

// 이미지 업로드
router.post('/upload', upload.single('selectImg'), (req, res) => {
    console.log(req.file);
    res.json({filename: `${req.file.filename}`});
});

module.exports = router;