const mongoose = require("mongoose");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const FriendSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    friendId: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Friend", FriendSchema);