var express = require("express");
var router = express.Router();
var userController = require("../controller/user.controller");

router.post("/register", userController.postRegister);
router.post("/login", userController.postLogin);
router.get("/book-list", sellerController.getBook);


module.exports = router;
