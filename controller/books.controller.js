var bookModel = require("../models/book");

module.exports.getBooks = async (req, res) => {
    const { page, perPage } = req.query;

    const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 2,
    };
    const books = await bookModel.paginate({}, options);
    return res.json(books);
};

module.exports.getBook = async (req, res) => {
    const { id_book: idBook } = req.params;
    console.log(idBook);

    const book = await bookModel.findById(idBook);
    return res.json(book);
};
