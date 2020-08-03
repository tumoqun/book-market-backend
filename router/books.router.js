var express = require("express");
var router = express.Router();
var booksController = require("../controller/books.controller");

router.get("/", booksController.getBook);

module.exports = router;
