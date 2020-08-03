var bookModel = require("../models/book");

module.exports.getBook = async (req, res) => {
    const { page, perPage } = req.query;
    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 10,
    };
    const books = await bookModel.paginate({}, options);
    return res.json(books);
};
