var express = require("express");
var router = express.Router();
var booksController = require("../controller/books.controller");

router.get("/all",booksController.getAllBooks);
router.post("/delete",booksController.deleteBook)
router.post("/search",booksController.searchBooks)
router.get("/", booksController.getBooks);
router.get("/:id_book", booksController.getBook);


module.exports = router;
