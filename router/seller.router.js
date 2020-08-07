var express = require("express");
var router = express.Router();
var sellerController = require("../controller/seller.controller");
const upload=require("../multer")
router.post("/upload",upload.array("images"), sellerController.postUpload);

// router.post("/login", userController.postLogin);
module.exports = router;
