const mongoose = require("mongoose");
var userSchema = new mongoose.Schema(
    {
        username: String,
        password: String,
        email: String,
        phone: Number,
        address: String,
        role: Number, // 1: buyer, 2: seller, 3: admin
        avatar: String,
        name: String,
        status: { type: Number, default: 1 },
        wallet: { Number, default: 0 },
        comments: [
            {
                author: { type: mongoose.Types.ObjectId, ref: "User" },
                content: String,
                rating: Number,
                createdAt: Date,
            },
        ],
        cart: [
            {
                book: { type: mongoose.Types.ObjectId, ref: "Book" },
                amount: Number,
            },
        ],
    },
    { timestamps: true }
);
var User = mongoose.model("User", userSchema, "users");
module.exports = User;
