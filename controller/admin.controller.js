const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const cloudinary = require("../cloudinary");
var User = require("../models/user");
var bookModel = require("../models/book");
var ObjectId = require("mongodb").ObjectId;
const Cart = require("../models/cart");
const { findById } = require("../models/user");
const Book = require("../models/book");
var ObjectId = require("mongodb").ObjectId;

module.exports.getUser = async (req, res) => {
    const {role}=req.query
    if(role==1){
    const buyer=await User.find({role:1})
    return res.json({success:true,data:buyer})
    }
    if(role==2)
    {
        const seller=await User.find({role:2})
    return res.json({success:true,data:seller})
    }
    return res.status(404).json({success:false,data:"get user failed!"})
}
