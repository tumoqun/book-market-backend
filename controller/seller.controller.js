var userModel = require("../models/user");
var bookModel = require("../models/book");
const upload = require("../multer");
const cloudinary = require("../cloudinary");
const fs = require("fs");

/*
    req.body = {
        title: 'xxx',
        description: 'xxx',
        author: 'xxx',
        price: xxx,
        quantity: xxx,
        images: ['xxx'],
        status: xxx,
        seller: 'xxx',
        category: 'xxx',
        previewImgs: ['xxx']
    }
*/
module.exports.postUpload = async (req, res) => {
    // const {user}=req
    const idDemo = "5f28184759ee352004b990b3";
    const sellerId = await userModel.findById(idDemo);
    const { title, description, author, price, quantity, thumbnail } = req.body;
    const uploader = async (path) => await cloudinary.uploads(path, "images");
    const urls = [];
    const files = req.files;
    console.log(req.files);
    for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path);
        urls.push(newPath);
        fs.unlinkSync(path);
    }
    // destructuring
    const Book = new bookModel({
        title: title,
        description: description,
        author: author,
        price: price,
        quantity: quantity,
        images: urls,
        thumbnail: thumbnail,
        seller: sellerId,
    });
    await Book.save(function (err) {
        if (err) return handleError(err);
        // saved!
    });
    res.status(201).json({ success: true, Book });
};
