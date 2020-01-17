const mongoose = require("mongoose");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: [/.+@.+\..+/, "Địa chỉ email không hợp lệ"]
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ["admin", "user"]
    },
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()
    }
}, { usePushEach: true });

module.exports = mongoose.model("User", UserSchema);