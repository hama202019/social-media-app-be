import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
    members: []
}, {timestamps: true})

chatSchema.statics.findChatByUsers = async function(user1Id, user2Id) {
    return await this.findOne({ members: { $all: [user1Id, user2Id] } });
};

const ChatModel = mongoose.model("Chat", chatSchema)
export default ChatModel