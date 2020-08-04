var userModel = require("../models/user");
var bookModel=require("../models/book")

module.exports.postUpload = async (req, res) => {
    const sellerId= await userModel.findById('5f0d38baca9a311508fc2a1f')
    const { title, description, author, price, quantity, images, thumbnail  } = req.body;
    // destructuring
    const Book= new bookModel({
        title:title,
        description:description,
        author:author,
        price:price,
        quantity:quantity,
        images:images,
        thumbnail:thumbnail,
        seller:sellerId
    })
    await Book.save(function (err) {
        if (err) return handleError(err);
        // saved!
      });
    res.status(201).json({ success: true, Book });
};

