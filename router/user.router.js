var express = require("express");
var router = express.Router();
var userController = require("../controller/user.controller");
const upload = require("../multer");

router.get("/", userController.getUsers);
router.post("/register", userController.postRegister);
router.post("/login", userController.postLogin);
router.post("/update", userController.update);
router.get("/book-list", userController.getBook);
router.get("/user", userController.getUserById);
router.post("/add-to-cart", userController.addToCart);
router.post("/comment", userController.Comment);
router.post("/remove-from-cart", userController.removeFromCart);
router.get("/cart", userController.getCart);
router.post(
    "/upload-avatar",
    upload.single("avatar"),
    userController.uploadAvatar
);
router.get("/remove-avatar", userController.removeAvatar);
router.post("/update-cart", userController.updateCart);

module.exports = router;
