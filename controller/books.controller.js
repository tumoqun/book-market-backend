var bookModel = require("../models/book");
var bookModel = require("../models/book");
var ObjectId = require("mongodb").ObjectId;

module.exports.getBooks = async (req, res) => {
    const { page, perPage, author, categoryId, sellerId } = req.query;

    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 10,
        populate: {
            path: "seller",
            model: "User",
        },
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
    console.log(sellerId);

    return res.json(books);
};

module.exports.getBook = async (req, res) => {
    const { id_book: idBook } = req.params;

    const book = await bookModel.findById(idBook);
    return res.json(book);
};
