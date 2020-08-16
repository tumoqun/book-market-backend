var express = require("express");
var router = express.Router();
const upload = require("../multer");
const jwt = require("jsonwebtoken");
const utils = require("../utils/utils");

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
        console.log(decoded);
        req.authenticated = true;
        return next();
    });
}
var sellerController = require("../controller/seller.controller");

// router.post("/upload", sellerController.postUpload);
var cpUpload = upload.fields([
    { name: "images", maxCount: 5 },
    { name: "previewImgs", maxCount: 20 },
]);

router.use(requireLogin);
router.post(
    "/upload",
    utils.requireRole(2),
    cpUpload,
    sellerController.postUpload
);

module.exports = router;
