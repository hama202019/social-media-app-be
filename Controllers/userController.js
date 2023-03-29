import UserModel from "../Models/userModel.js";

export const getUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await UserModel.findById(userId);
        if(!user) return res.status(404).json({error: "no such user"});
        const {password, ...otherFields} = user._doc;
        res.status(200).json(otherFields);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}