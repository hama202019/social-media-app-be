import ChatModel from "../Models/ChatModel.js";

export const createChat = async (req, res) => {
    const {user1Id, user2Id} = req.body;
    try {
        if(ChatModel.findChatByUsers(user1Id, user2Id)) return res.status(400).json({error: "The Chat is already exist"});
        const chat = await ChatModel.create({members: [user1Id, user2Id]});
        res.status(200).json(chat);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export const userChats = async (req, res) => {
    const {userId} = req.params;
    try {
        const chats = await ChatModel.find({members: {$in: [userId]}})
        res.status(200).json(chats)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}