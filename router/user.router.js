var express = require("express");
var router = express.Router();
var userController = require("../controller/user.controller");
router.post("/register", userController.postRegister);
router.post("/login", userController.postLogin);
module.exports = router;
