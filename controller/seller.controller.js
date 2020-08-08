var userModel = require("../models/user");
var bookModel=require("../models/book")
const upload=require('../multer')
const cloudinary=require('../cloudinary')
const fs=require('fs')

module.exports.postUpload = async (req, res) => {
    // const {user}=req
    const sellerId= await userModel.findById("5f28181d59ee352004b990b2")
    const { title, description, author, price, quantity, thumbnail  } = req.body;
    const uploaderImages=async(path)=> await cloudinary.uploads(path,'images')
    // const uploaderThumbnail=async(path)=> await cloudinary.uploads(path,'thumbnails')
    const urls=[]
    const files=req.files
    console.log(files)
    // for(const file of files){
    //     const {path}=file
    //     console.log(file)
    //     const newPath= await uploaderImages(path)
    //     urls.push(newPath)
    //     fs.unlinkSync(path)
    // }
    // // destructuring
    // const Book= new bookModel({
    //     title:title,
    //     description:description,
    //     author:author,
    //     price:price,
    //     quantity:quantity,
    //     images:urls,
    //     thumbnail:thumbnail,
    //     seller:sellerId
    // })
    // await Book.save(function (err) {
    //     if (err) return handleError(err);
    //     // saved!
    //   });
    // res.status(201).json({ success: true, Book });
};


