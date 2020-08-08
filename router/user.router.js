var express = require("express");
var router = express.Router();
var userController = require("../controller/user.controller");

router.post("/register", userController.postRegister);
router.post("/login", userController.postLogin);
router.post("/update", userController.update);
router.get("/book-list", userController.getBook);
router.get("/user", userController.getUserById);
router.post("/add-to-cart",userController.addToCart)
router.post("/comment",userController.Comment)
router.post("/remove-from-cart",userController.removeFromCart)

module.exports = router;
