const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

var User = require("../models/user");
var bookModel=require("../models/book")
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
    res.status(201).json({ success: true, data: { user } });
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
    const {author,bookId,categoryId}=req.body
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