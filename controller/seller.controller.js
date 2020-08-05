var userModel = require("../models/user");
var bookModel=require("../models/book")

module.exports.postUpload = async (req, res) => {
    const {user}=req
    const sellerId= await userModel.findById(user._id)
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

