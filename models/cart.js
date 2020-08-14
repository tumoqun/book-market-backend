const mongoose = require("mongoose");
var cartSchema = new mongoose.Schema({
    userID: String,
    totalPrice:{Number,default:0},
    productList:Array
});
var Cart = mongoose.model("Cart", cartSchema, "carts");
module.exports = Cart;