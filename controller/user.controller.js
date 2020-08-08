const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

var User = require("../models/user");
var bookModel = require("../models/book");
var ObjectId = require("mongodb").ObjectId;
const Cart = require("../models/cart");
const { findById } = require("../models/user");
const Book = require("../models/book");
var ObjectId = require("mongodb").ObjectId;

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
    const cart = new Cart({
        userID: user._id,
    });
    await cart.save();
    res.status(201).json({ success: true, data: { user } });
};

module.exports.addToCart = async (req, res) => {
    const { productID, amount } = req.body;
    let userDemo = "5f2d4905d71a33560403041a";
    var duplicate=false
    // const {user}=req
    const product = await Book.findById(productID);
    const cart =await Cart.find({userID:userDemo})
    cart[0].productList.forEach(element => {
        if(element.productID==productID) {
            element.amount=parseInt(element.amount)+parseInt(amount)
            duplicate=true
            }
        })
    var update
    if(duplicate) { update=await Cart.findOneAndUpdate({userID:userDemo},
        {
            productList:cart[0].productList
        })
    }
    else{
         update = await Cart.findOneAndUpdate(
        { userID: userDemo },
        {
            $push: {
                productList: {
                    amount: amount,
                    productID: product,
                },
            },
        }
    );
    }
   
    if (update) res.status(201).json({ success: true, data: "Add successfully!" });
};

module.exports.removeFromCart = async (req, res) => {
    const { productID } = req.body;
    console.log(productID)
    let userDemo = "5f2d4905d71a33560403041a";
    // const {user}=req
    const cart =await Cart.find({userID:userDemo})
    for(let i=0;i<cart[0].productList.length;i++){
        if(cart[0].productList[i].productID._id==productID) 
        {
            cart[0].productList.splice(i,1)
            break;
        }
    }
    const update=await Cart.findOneAndUpdate({userID:userDemo},
        {
            productList:cart[0].productList
        })
    if(update) res.status(201).json({ success: true, data: "Remove successfully!" });
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

module.exports.update = async (req, res) => {
    const user = "5f1dacbce20e190faca9c8eb";
    let objUpdate = req.body;

    const result = await User.findOneAndUpdate({ _id: user }, objUpdate, {
        new: true,
    });

    res.status(201).json({ success: true, data: { user: result } });
};
module.exports.getBook = async (req, res) => {
    const { page, perPage, author, categoryId, sellerId } = req.query;

    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 10,
    };

    if (!categoryId && !sellerId && !author) {
        const books = await bookModel.paginate({}, options);
        return res.json(books);
    }

    const books = await bookModel.paginate(
        {
            $or: [
                { author: author },
                { category: ObjectId(categoryId) },
                { seller: ObjectId(sellerId) },
            ],
        },
        options
    );

    return res.json(books);
};

module.exports.getUserById = async (req, res) => {
    const { ID } = req.query;
    const user = await User.findById(ID);
    return res.json(user);
};

module.exports.Comment = async (req, res) => {
    const { rating, content, sellerID } = req.body;
    const createdAt = Date.now();
    const seller = await User.findOneAndUpdate(
        { _id: ObjectId(sellerID) },
        {
            $push: {
                comment: {
                    rating: rating,
                    content: content,
                    createdAt: createdAt,
                },
            },
        }
    );
    if (seller)
        return res.status(201).json({ success: true, data: { seller } });
};
