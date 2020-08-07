var express = require("express");
var router = express.Router();
var userController = require("../controller/user.controller");

router.post("/register", userController.postRegister);
router.post("/login", userController.postLogin);
router.get("/book-list", userController.getBook);
router.get("/user", userController.getUserById);


module.exports = router;
