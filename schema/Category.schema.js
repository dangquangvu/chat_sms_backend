const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Category_schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model("Category", Category_schema);