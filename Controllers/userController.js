import UserModel from "../Models/userModel.js";
import bcrypt from 'bcrypt';

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

export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const {currentUserId, currentUserAdminStatus, password} = req.body;
    if(userId === currentUserId || currentUserAdminStatus){
        try {
            if (password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(password, salt);
            }
            const user = await UserModel.findByIdAndUpdate(userId, req.body, {new: true});
            if(!user) return res.status(404).json({error: "no such user"});
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({error: error.message});           
        }
    }else{
        res.status(403).json("Access Denied! you can only update your own profile");
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id;
  
    const { currentUserId, currentUserAdminStatus } = req.body;
  
    if(currentUserId === id || currentUserAdminStatus) {
      try {
        await UserModel.findByIdAndDelete(id);
        res.status(200).json("User deleted successfully");
      } catch (error) {
        res.status(400).json(error);
      }
    } else {
      res.status(403).json("Access Denied! you can only delete your own profile");
    }
};