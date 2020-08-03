const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');

var bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    price: Number,
    status: Number,
    quantity: Number,
    seller: mongoose.Schema.Types.ObjectId,
    category: mongoose.Schema.Types.ObjectId,
    images: Array,
    thumbnails: Array
});
bookSchema.plugin(mongoosePaginate)
var Book = mongoose.model("Book", bookSchema, "books");
module.exports = Book;
