const { ConversationSchema } = require("../schema");

module.exports = {
    count: function(where) {
        return new Promise(resolve => {
            ConversationSchema.countDocuments(where).exec((err, result) => {
                if (err) {
                    return resolve(0);
                }
                return resolve(result);
            });
        });
    },

    findById: function(where) {
        return new Promise((resolve, reject) => {
            ConversationSchema.findOne({ _id: where }).exec((err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    },
    findByName: function(where) {
        return new Promise((resolve, reject) => {
            ConversationSchema.findOne({ nameConversation: where }).exec(
                (err, result) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(result);
                }
            );
        });
    },

    createConversation: async function(where) {
        let user = new ConversationSchema(where);
        let data = await user.save();
        if (!data) throw new Error("something bad happened");
        return data;
    },

    findAll: () => {
        return new Promise((resolve, reject) => {
            ConversationSchema.find().exec((err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    }
};