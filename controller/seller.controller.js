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
    const idDemo = "5f28184759ee352004b990b3";
    const sellerId = await userModel.findById(idDemo);

    const uploader = async (path) => await cloudinary.uploads(path, "images");
    const urlsImage = [];
    const urlsPreview = [];
    const files = req.files;
    for (const file of files.images) {
        const newPath = await uploader(file.path);
        urlsImage.push(newPath);
        fs.unlinkSync(file.path);
    }
    for (const filePrev of files.previewImgs) {
        const url = await uploader(filePrev.path);
        urlsPreview.push(url);
        fs.unlinkSync(filePrev.path);
    }
    // destructuring
    let bookDoc = {
        ...req.body,
        images: urlsImage,
        previewImgs: urlsPreview,
        seller: sellerId,
    };
    console.log(bookDoc);
    const Book = new bookModel(bookDoc);
    await Book.save();
    res.status(201).json({ success: true, Book });
};
