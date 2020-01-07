const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Songs_schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    category_music: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    img: { data: Buffer, contentType: String }
});

module.exports = mongoose.model("Songs", Songs_schema);