const { MessageSchema } = require("../schema");

module.exports = {
    findById: async where => {
        MessageSchema.findOne({ _id: where }).exec((err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    },
    save: async where => {
        let mess = new MessageSchema(where);
        let data = await mess.save();
        if (!data) throw new Error("something bad happened");
        return data;
    }
};