var express = require("express");
var router = express.Router();
var userController = require("../controller/user.controller");
const upload = require("../multer");
const utils =require("../utils/utils")
const jwt = require("jsonwebtoken");

function requireLogin(req, res, next) {
    let accessToken = req.header("Authorization");
    if (accessToken && accessToken.startsWith("Bearer ")) {
      // Remove Bearer from string
      accessToken = accessToken.slice(7, accessToken.length);
    }
  
    jwt.verify(accessToken, "sercretKey", (err, decoded) => {
      if (err) {
        return res.status(401).send("Not authenticated");
      }
      req.user = decoded.user;
      req.authenticated = true;
      return next();
    });
  }

router.post("/register", userController.postRegister);
router.post("/login", userController.postLogin);
router.use(requireLogin)
router.post("/update", userController.update);
router.get("/book-list",utils.requireRole(1), userController.getBook);
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

module.exports = router;
