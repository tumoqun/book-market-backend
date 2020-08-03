var userModel = require("../models/user");
var bookModel = require("../models/book");

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

    const Book = new bookModel({
        ...req.body,
        seller: sellerId,
    });
    await Book.save(function (err) {
        if (err) return handleError(err);
        // saved!
    });
    res.status(201).json({ success: true, Book });
};
