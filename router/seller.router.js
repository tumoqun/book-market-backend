var express = require("express");
var router = express.Router();
const upload = require("../multer");

var sellerController = require("../controller/seller.controller");

// router.post("/upload", sellerController.postUpload);
var cpUpload = upload.fields([
    { name: "images", maxCount: 5 },
    { name: "previewImgs", maxCount: 20 },
]);
router.post("/upload", cpUpload, sellerController.postUpload);

module.exports = router;
