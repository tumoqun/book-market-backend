const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

var orderSchema = new mongoose.Schema(
    {
        customer: { type: mongoose.Types.ObjectId, ref: "User" },
        cart: { totalPrice: Number, productList: Array },
        status: Number,
        // 0: seller chưa xác nhận,
        // 1: seller xác nhận và đã giao hàng,
        // 2: hủy đơn hàng
    },
    { timestamps: true }
);
orderSchema.plugin(mongoosePaginate);
var Order = mongoose.model("Order", orderSchema, "orders");
module.exports = Order;
