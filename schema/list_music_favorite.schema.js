const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const list_favorite_chema = new Schema({
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
    }
});

module.exports = mongoose.model("FavoriteMusic", list_favorite_chema);