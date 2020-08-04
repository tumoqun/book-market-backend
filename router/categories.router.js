var express = require("express");
var router = express.Router();
var categoriesController = require("../controller/categories.controller");

router.get("/", categoriesController.get);

module.exports = router;
