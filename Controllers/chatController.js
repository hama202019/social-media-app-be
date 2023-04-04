import ChatModel from "../Models/ChatModel.js";

export const createChat = async (req, res) => {
    const {firstMember, secondMember} = req.body;
    try {
        const chat = await ChatModel.create({members: [firstMember, secondMember]});
        res.status(200).json(chat);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}