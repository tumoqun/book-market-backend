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
    let user = req.user;
    var duplicate = false;

    const product = await Book.findById(productID);
    const cart = await Cart.find({ userID: user.id });
    var totalPrice = 0;
    cart[0].productList.forEach((element) => {
        if (element.productID._id == productID) {
            element.amount = parseInt(element.amount) + parseInt(amount);
            duplicate = true;
        }
        totalPrice += parseInt(element.amount * element.productID.price);
    });
    var update;
    if (duplicate) {
        update = await Cart.findOneAndUpdate(
            { userID: user.id },
            {
                productList: cart[0].productList,
                totalPrice: totalPrice,
            }
        );
    } else {
        update = await Cart.findOneAndUpdate(
            { userID: user.id },
            {
                $push: {
                    productList: {
                        amount: amount,
                        productID: product,
                    },
                },
                $inc: {
                    totalPrice: parseInt(amount * product.price),
                },
            }
        );
    }
    const result = await Cart.find({ userID: user.id });
    if (update) res.status(201).json({ success: true, data: result });
};

module.exports.removeFromCart = async (req, res) => {
    const { productID } = req.body;
    const cart = await Cart.find({ userID: req.user.id });
    var totalPrice = cart[0].totalPrice;
    for (let i = 0; i < cart[0].productList.length; i++) {
        if (cart[0].productList[i].productID._id == productID) {
            totalPrice -= parseInt(
                cart[0].productList[i].amount *
                    cart[0].productList[i].productID.price
            );
            cart[0].productList.splice(i, 1);
            break;
        }
    }
    const update = await Cart.findOneAndUpdate(
        { userID: req.user.id },
        {
            productList: cart[0].productList,
            totalPrice: totalPrice,
        }
    );
    const result = await Cart.findOne({ userID: req.user.id });
    if (update) res.status(201).json({ success: true, data: result });
};

module.exports.updateCart = async (req, res) => {
    const { productID, amount } = req.body;
    const cart = await Cart.findOne({ userID: req.user.id });
    console.log(cart);
    let productList = [...cart.productList];

    let distance = 0;
    for (let product of productList) {
        if (productID === product.productID._id.toString()) {
            distance =
                product.productID.price * amount -
                product.productID.price * product.amount;
            product.amount = amount;
            break;
        }
    }
    console.log(productList);
    console.log(distance);
    var totalPrice = parseInt(cart.totalPrice) + distance;

    console.log(totalPrice);
    const update = await Cart.findOneAndUpdate(
        { userID: req.user.id },
        {
            productList,
            totalPrice,
        },
        { new: true }
    );
    const result = await Cart.findOne({ userID: req.user.id });
    res.status(201).json({ success: true, data: result });
};

module.exports.postLogin = async (req, res) => {
    const { username, password, role } = req.body;
    console.log(role);
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
        if (userByUsername.role !== role) {
            return res
                .status(202)
                .json({ success: false, msg: "Lỗi quyền truy cập" });
        }
    }

    const payload = {
        user: {
            id: userByUsername.id,
            email: userByUsername.email,
            username: userByUsername.username,
            role: userByUsername.role,
        },
    };
    const accessToken = jwt.sign(payload, process.env.jwt, {
        expiresIn: "2d",
    });
    res.status(201).json({
        success: true,
        data: { accessToken, user: payload.user },
    });
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
    console.log(req.user);
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

module.exports.getCart = async (req, res) => {
    const cart = await Cart.findOne({ userID: req.user.id });

    return res.json(cart);
};

module.exports.getUserById = async (req, res) => {
    const { ID } = req.query;
    const user = await User.findById(ID).populate("comments.author");
    return res.json(user);
};

module.exports.Comment = async (req, res) => {
    console.log("here");
    const { rating, content, sellerID } = req.body;
    const authorDemo = "5f2d4905d71a33560403041a";
    let user = await User.findById(authorDemo);
    const createdAt = Date.now();
    const seller = await User.findOneAndUpdate(
        { _id: ObjectId(sellerID) },
        {
            $push: {
                comments: {
                    author: user,
                    rating: rating,
                    content: content,
                    createdAt: createdAt,
                },
            },
        },
        { new: true }
    ).populate("comments.author");
    console.log(seller);
    if (seller)
        return res
            .status(201)
            .json({ success: true, comments: seller.comments });
    else
        return res.status(204).json({ success: false, data: "Comment failed" });
};
module.exports.uploadAvatar = async (req, res) => {
    let userDemo = "5f2d4905d71a33560403041a";
    const uploader = async (path) => await cloudinary.uploads(path, "images");
    const newPath = await uploader(req.file.path);

    const result = await User.findOneAndUpdate(
        { _id: ObjectId(userDemo) },
        { avatar: newPath.url },
        { new: true }
    );
    console.log(result);
    res.status(200).json({ success: true, avatar: newPath.url });
};
module.exports.removeAvatar = async (req, res) => {
    let userDemo = "5f2d4905d71a33560403041a";
    const result = await User.findOneAndUpdate(
        { _id: ObjectId(userDemo) },
        { avatar: undefined }
    );
    res.status(201).json({ success: true });
};
