const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./router/user.router");
const sellerRouter = require("./router/seller.router");
const booksRouter = require("./router/books.router");
const categoriesRouter = require("./router/categories.router");
const app = express();

require("dotenv").config();
app.use(cors());
mongoose.connect(process.env.DB_CONNECT_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/users", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/books", booksRouter);
app.use("/api/categories", categoriesRouter);

app.listen(process.env.PORT || 3001, () =>
    console.log(
        `Example app listening at http://localhost:${process.env.PORT || 3001}`
    )
);
