var express = require("express");
var router = express.Router();
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
      console.log(decoded)
      req.authenticated = true;
      return next();
    });
  }
//admin route here 

router.use(requireLogin)
router.post("/abc", utils.requireRole(3));

