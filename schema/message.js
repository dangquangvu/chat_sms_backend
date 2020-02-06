const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    conversationId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true // createdAt will be our timestamp.
});

MessageSchema.index({ conversationId: -1, timestamps: -1, body: -1 });

module.exports = mongoose.model("Message", MessageSchema);