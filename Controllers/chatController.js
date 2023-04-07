import ChatModel from "../Models/ChatModel.js";

export const createChat = async (req, res) => {
    const {user1Id, user2Id} = req.body;
    if(!user1Id || !user2Id) return res.status(400).json({error: "some required data are missing!"});
    try {
        if(await ChatModel.findChatByUsers(user1Id, user2Id)) return res.status(400).json({error: "The Chat is already exist"});
        const chat = await ChatModel.create({members: [user1Id, user2Id]});
        res.status(200).json(chat);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export const userChats = async (req, res) => {
    const {userId} = req.params;
    try {
        const chats = await ChatModel.find({members: {$in: [userId]}}).populate({
            path: 'members',
            select: '_id firstName lastName profilePicture'
        })
        const chatsWithUsers = chats.map( chat => {
            const otherUser = chat.members.find(member => member._id.toString() !== userId);
            return {
              chatId: chat._id,
              userId: otherUser._id,
              firstName: otherUser.firstName,
              lastName: otherUser.lastName,
              profilePicture: otherUser.profilePicture
            };
        });
        res.status(200).json(chatsWithUsers);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export const findChat = async (req, res) => {
    const {user1Id, user2Id} = req.params;
    try {
        const chat = await ChatModel.findOne({members: {$all: [user1Id, user2Id]}});
        if(!chat){
            const newChat = await ChatModel.create({members: [user1Id, user2Id]});
            return res.status(200).json(newChat);
        }
        res.status(200).json(chat);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}