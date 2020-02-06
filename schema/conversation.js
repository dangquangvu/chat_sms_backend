const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Schema defines how chat messages will be stored in MongoDB
const ConversationSchema = new Schema({
    nameConversation: {
        type: String,
        default: ""
    },
    participants: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model("Conversation", ConversationSchema);