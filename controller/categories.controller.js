var Category = require("../models/category");

module.exports.get = async (req, res) => {
    const categories = await Category.find({});
    return res.json(categories);
};
