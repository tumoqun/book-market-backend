const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./router/user.router");
const sellerRouter = require("./router/seller.router");
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
app.use("/seller", sellerRouter);

app.listen(process.env.PORT || 3001, () =>
    console.log(
        `Example app listening at http://localhost:${process.env.PORT || 3001}`
    )
);
