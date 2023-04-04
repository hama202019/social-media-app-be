import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chatId: String,
    senderId: String,
    messageContent: String
}, {timestamps: true});

const MessageModel = mongoose.model("Message", messageSchema);
export default MessageModel