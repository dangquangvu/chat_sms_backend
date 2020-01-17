const { User } = require("../schema");
//= require('../schemas/index');

module.exports = {
    count: function(where) {
        return new Promise(resolve => {
            DriveSchema.countDocuments(where).exec((err, result) => {
                if (err) {
                    return resolve(0);
                }
                return resolve(result);
            });
        });
    },

    findByEmail: function(where) {
        return new Promise((resolve, reject) => {
            User.findOne({ email: where }).exec((err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    },

    createUser: async function(where) {
        let user = new User(where);
        let data = await user.save();
        if (!data) throw new Error("something bad happened");
        return data;
    }
};