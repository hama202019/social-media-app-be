import mongoose from "mongoose";
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

export const followUser = async (req, res) => {
    const id = req.params.id;

    const currentUserId = req.body._id;

    if (currentUserId === id) return  res.status(403).json("Action forbidden");
    
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);

      if (!followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $push: { followers: currentUserId } });
        await followingUser.updateOne({ $push: { following: id } });
        const updatedUser = await UserModel.findById(currentUserId);
        res.status(200).json(updatedUser);
      } else {
        res.status(403).json("User is Already followed by you");
      }
    } catch (error) {
      res.status(400).json(error);
    }
};

export const unFollowUser = async (req, res) => {
    const id = req.params.id;
  
    const currentUserId = req.body._id;
  
    if (currentUserId === id) return res.status(403).json("Action forbidden");

    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);

      if (followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $pull: { followers: currentUserId } });
        await followingUser.updateOne({ $pull: { following: id } });
        const updatedUser = await UserModel.findById(currentUserId);
        res.status(200).json(updatedUser);
      } else {
        res.status(403).json("User is not followed by you");
      }
    } catch (error) {
      res.status(400).json(error);
    }
};

export const getAllUsers = async (req, res) => {
  const {id} = req.query
  if(!id) return res.status(400).json({error: "the ID is required!"})
  try {
    let users = await UserModel.find()
    users = users.map( user => {
      const {password, ...otherFields} = user._doc
      return otherFields
    })
    users = users.filter(user => user._id.toString() !== id)
    res.status(200).json(users)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

export const deleteAll = async (req, res) => {
  try {
    await UserModel.deleteMany()
    res.status(200).json({message: "all users are deleted"})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}