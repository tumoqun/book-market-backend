const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

var bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    price: Number,
    status: Number, // 1: ?, 2: ?, 3: ?
    quantity: Number,
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    category: mongoose.Schema.Types.ObjectId,
    images: Array,
    previewImgs: Array,
});
bookSchema.plugin(mongoosePaginate);
var Book = mongoose.model("Book", bookSchema, "books");
module.exports = Book;
