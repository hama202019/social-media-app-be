import PostModel from "../Models/postModel.js";

export const createPost = async (req, res) => {
  try {
    await PostModel.create(req.body);
    res.status(200).json("Post created!");
  } catch (error) {
    res.status(400).json(error);
  }
};