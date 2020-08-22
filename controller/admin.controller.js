const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const cloudinary = require("../cloudinary");
var User = require("../models/user");
var bookModel = require("../models/book");
var ObjectId = require("mongodb").ObjectId;
const Cart = require("../models/cart");
const { findById } = require("../models/user");
const Book = require("../models/book");
const Order = require("../models/order");
var ObjectId = require("mongodb").ObjectId;

module.exports.getUser = async (req, res) => {
    const { role } = req.query;
    if (role == 1) {
        const buyer = await User.find({ role: 1 });
        return res.json({ success: true, data: buyer });
    }
    if (role == 2) {
        const seller = await User.find({ role: 2 });
        return res.json({ success: true, data: seller });
    }
    return res.status(404).json({ success: false, data: "get user failed!" });
};

module.exports.getOrders = async (req, res) => {
    const orders = await Order.find({}).populate("customer");
    res.json({ success: true, orders });
};

module.exports.changeStatus = async (req, res) => {
    let result = await Order.findByIdAndUpdate(req.params.idOrder, {
        status: req.body.status,
    });
    console.log(result);
    const orders = await Order.find({}).populate("customer");
    res.json({ success: true, orders });
};

module.exports.banUser = async (req, res) => {
    const { email, status } = req.body;
    var user;
    if (status == "Đã bị ban") {
        user = await User.findOneAndUpdate({ email: email }, { status: 1 });
    } else {
        user = await User.findOneAndUpdate({ email: email }, { status: 0 });
    }
    if (user)
        return res.json({
            success: true,
            msg: "Thay đổi trạng thái thành công!",
        });
    else
        return res.json({
            success: false,
            msg: "Thay đổi trạng thái thất bại!",
        });
};
