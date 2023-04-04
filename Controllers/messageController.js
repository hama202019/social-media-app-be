import MessageModel from "../Models/MessageModel.js";

export const sendMessage = async (req, res) => {
    const {chatId, senderId, messageContent} = req.body;
    if(!chatId || !senderId || messageContent === '') return res.status(400).json({error: "some required data are missing"});
    try {
        const message = await MessageModel.create({chatId, senderId, messageContent});
        res.status(200).json(message);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}