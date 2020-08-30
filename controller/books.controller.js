var bookModel = require("../models/book");
var bookModel = require("../models/book");
var ObjectId = require("mongodb").ObjectId;

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

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

    console.log(books)
    return res.json(books);
};

module.exports.getAllBooks=async(req,res)=>{
    const books=await bookModel.find({})
    return res.json(books)
}

module.exports.searchBooks=async(req,res)=>{
    if (req.body.keyword) {
        const regex = new RegExp(escapeRegex(req.body.keyword), 'gi');
        bookModel.find({ title: regex }, function(err, foundbooks) {
            if(err) {
                return res.json(err);
            } else {
               return res.json(foundbooks)
            }
        }); 
    }
    else {
        bookModel.find({  }, function(err, foundbooks) {
            if(err) {
                return res.json(err);
            } else {
               return res.json(foundbooks)
            }
        }); 
    }
}

module.exports.getBook = async (req, res) => {
    const { id_book: idBook } = req.params;

    const book = await bookModel.findById(idBook).populate("seller");
    return res.json(book);
};

module.exports.deleteBook= async(req,res)=>{
    const {name}=req.body
    const book=await bookModel.findOneAndDelete({title:name})
    if (book) return res.json("Xóa thành công!")
    else return res.json("Xóa thất bại")
}
