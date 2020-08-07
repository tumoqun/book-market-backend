var express = require("express");
var router = express.Router();
const upload = require("../multer");

var sellerController = require("../controller/seller.controller");

// router.post("/upload", sellerController.postUpload);
router.post("/upload", upload.array("images"), sellerController.postUpload);

module.exports = router;
