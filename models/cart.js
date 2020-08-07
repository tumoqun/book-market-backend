const mongoose = require("mongoose");
var cartSchema = new mongoose.Schema({
    
});
var User = mongoose.model("User", userSchema, "users");
module.exports = User;