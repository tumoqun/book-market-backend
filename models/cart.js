const mongoose = require("mongoose");
var cartSchema = new mongoose.Schema({
    userID: String,
    totalPrice:Number,
    productList:Array
});
var Cart = mongoose.model("Cart", cartSchema, "carts");
module.exports = Cart;