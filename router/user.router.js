var express = require("express");
var router = express.Router();
var userController = require("../controller/user.controller");

router.post("/register", userController.postRegister);
router.post("/login", userController.postLogin);
router.post("/update", userController.update);
router.get("/book-list", userController.getBook);
router.get("/user", userController.getUserById);
<<<<<<< HEAD
router.post("/add-to-cart", userController.addToCart);
=======
router.post("/add-to-cart",userController.addToCart)
router.post("/comment",userController.Comment)
>>>>>>> e120d8492470cfdbaee441c2e06fb17cb1a6cfd7

module.exports = router;
