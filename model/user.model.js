const { UserSchema } = require("../schema");
//= require('../schemas/index');

module.exports = {
    count: function(where) {
        return new Promise(resolve => {
            UserSchema.countDocuments(where).exec((err, result) => {
                if (err) {
                    return resolve(0);
                }
                return resolve(result);
            });
        });
    },

    findByEmail: function(where) {
        return new Promise((resolve, reject) => {
            UserSchema.findOne({ email: where }).exec((err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    },

    createUser: async function(where) {
        let user = new UserSchema(where);
        let data = await user.save();
        if (!data) throw new Error("something bad happened");
        return data;
    },
    //,{"title":1,_id:0}
    findAll: () => {
        return new Promise((resolve, reject) => {
            UserSchema.find({}, { password: 0, friend: 0, created: 0, updated: 0, __v: 0, role: 0 }).exec((err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    }
};