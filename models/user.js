const mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phone: Number,
    address: String,
    role: Number, // 1: buyer, 2: seller, 3: admin
    avatar: String,
<<<<<<< HEAD
    name: String,
=======
    comment:Array
>>>>>>> e120d8492470cfdbaee441c2e06fb17cb1a6cfd7
});
var User = mongoose.model("User", userSchema, "users");
module.exports = User;
