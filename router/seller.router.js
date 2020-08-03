var express = require("express");
var router = express.Router();
var sellerController = require("../controller/seller.controller");

router.post("/upload", sellerController.postUpload);

module.exports = router;
