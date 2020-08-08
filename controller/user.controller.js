const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

var User = require("../models/user");
var bookModel=require("../models/book")
var cartModel=require("../models/cart");
const Cart = require("../models/cart");
const { findById } = require("../models/user");
const Book = require("../models/book");
var ObjectId = require('mongodb').ObjectId;

module.exports.postRegister = async (req, res) => {
    const { email, username } = req.body;
    const userByUsername = await User.find({ username });

    if (userByUsername.length) {
        return res.status(202).json({
            success: false,
            msg: "Tên tài khoản đã tồn tại",
        });
    }
    const userByMail = await User.find({ email });
    if (userByMail.length) {
        return res.status(202).json({
            success: false,
            msg: "Email đã tồn tại",
        });
    }

    var hash = bcryptjs.hashSync(req.body.password);
    req.body.password = hash;
    var user = await User.create(req.body);
    const cart=new Cart({
        userID: user._id
    })
    await cart.save()
    res.status(201).json({ success: true, data: { user } });
};

module.exports.addToCart = async (req, res) => {
    const { productID, amount } = req.body;
    // const {user}=req
    const product=await Book.findById(productID)
    const cart =await Cart.findOneAndUpdate(
        {userID:"5f2d4905d71a33560403041a"},
        {
            $push:{
                productList:{
                    amount:amount,
                    productID:product
                }
            }
        }
        )
    if(cart) res.status(201).json({ success: true, data: { cart } });
};

module.exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    const userByUsername = await User.findOne({ username });

    if (userByUsername === null) {
        return res
            .status(202)
            .json({ success: false, msg: "Username không tồn tại" });
    } else {
        if (!bcryptjs.compareSync(password, userByUsername.password)) {
            return res
                .status(202)
                .json({ success: false, msg: "Mật khẩu không đúng" });
        }
    }

    const payload = { id: userByUsername.id };
    const accessToken = jwt.sign(payload, process.env.jwt, {
        expiresIn: "2d",
    });
    res.status(201).json({ success: true, data: { accessToken } });
};

module.exports.getBook = async (req, res) => {
    const {page,perPage}=req.query
    const {author,bookId,categoryId}=req.query
    console.log(bookId)
    console.log(author)
    const options={
        page:parseInt(page,10),
        limit:parseInt(perPage,10)
    }
    const books=await bookModel.paginate({
         $or:[{author:author},
            {_id:ObjectId(bookId)},
            {category:ObjectId(categoryId)}
            ]
        }
    ,options)
    console.log(books)
    return res.json(books)
}

module.exports.getUserById = async (req, res) => {
    const {ID}=req.query
    const user=await User.findById(ID)
    return res.json(user)
}

module.exports.Comment=async (req,res)=>{
    const {rating,content,sellerID}=req.body
    const createdAt=Date.now()
    const seller =await User.findOneAndUpdate(
        {_id:ObjectId(sellerID)},
        {
            $push:{
                comment:{
                    rating:rating,
                    content:content,
                    createdAt:createdAt
                }
            }
        }
        )
    if (seller) return res.status(201).json({ success: true, data: { seller } });
}