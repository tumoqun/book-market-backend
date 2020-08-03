const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

var User = require("../models/user");

module.exports.postRegister = async (req, res) => {
    const { email, username } = req.body;
    const userByUsername = await User.find({ username });

    if (userByUsername.length) {
        return res.status(202).json({
            success: false,
            msg: "Tên tài khoản đã tồn tại",
        });
    }
    const userByMail = await User.find({ email });
    if (userByMail.length) {
        return res.status(202).json({
            success: false,
            msg: "Email đã tồn tại",
        });
    }

    var hash = bcryptjs.hashSync(req.body.password);
    req.body.password = hash;
    var user = await User.create(req.body);
    res.status(201).json({ success: true, data: { user } });
};

module.exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    const userByUsername = await User.findOne({ username });

    if (userByUsername === null) {
        return res
            .status(202)
            .json({ success: false, msg: "Username không tồn tại" });
    } else {
        if (!bcryptjs.compareSync(password, userByUsername.password)) {
            return res
                .status(202)
                .json({ success: false, msg: "Mật khẩu không đúng" });
        }
    }

    const payload = { id: userByUsername.id };
    const accessToken = jwt.sign(payload, process.env.jwt, {
        expiresIn: "2d",
    });
    res.status(201).json({ success: true, data: { accessToken } });
};

module.exports.update = async (req, res) => {
    const user = "5f1dacbce20e190faca9c8eb";
    let objUpdate = req.body;
    console.log(objUpdate);
    const result = await User.findOneAndUpdate({ _id: user }, objUpdate, {
        new: true,
    });
    console.log(result);
    res.status(201).json({ success: true, data: { user: result } });
};
