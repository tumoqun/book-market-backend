const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

var User = require("../models/user");

module.exports.postRegister = async (req, res) => {
    const { email, username } = req.body;
    // destructuring
    const userHasUsername = await User.find({ username });

    if (userHasUsername.length) {
        return res.status(202).json({
            success: false,
            msg: "Tên tài khoản đã tồn tại",
        });
    }
    const userHasEmail = await User.find({ email });
    if (userHasEmail.length) {
        return res.status(202).json({
            success: false,
            msg: "Email đã tồn tại",
        });
    }
    var hash = bcryptjs.hashSync(req.body.password);
    req.body.password = hash;
    var user = await User.create(req.body);
    res.status(201).json({ success: true, user });
};

module.exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    const userHasUsername = await User.findOne({ username });
    if (userHasUsername === null) {
        return res
            .status(202)
            .json({ success: false, msg: "Username không tồn tại" });
    }
    if (!bcryptjs.compareSync(password, userHasUsername.password)) {
        return res
            .status(202)
            .json({ success: false, msg: "Mật khẩu không đúng" });
    }
    const payload = { id: userHasUsername.id };
    const accessToken = jwt.sign(payload, process.env.jwt, {
        expiresIn: 10 * 60 * 1000,
    });
    res.status(201).json({ success: true, accessToken });
};
