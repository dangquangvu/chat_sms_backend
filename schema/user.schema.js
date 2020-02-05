const mongoose = require("mongoose");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;
let SALT_WORK_FACTOR = 10;

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
        enum: ["admin", "user"],
        default: "user"
    },
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()
    },
    friend: {
        type: Object,
        default: []
    },
    img: {
        type: String,
        default: ""
    },
    online: {
        type: Boolean,
        default: false
    }
}, { usePushEach: true });
UserSchema.pre("save", function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, this.password).then(data => {
            return resolve(data);
        });
    });
};

module.exports = mongoose.model("User", UserSchema);