import PostModel from "../Models/postModel.js";

export const createPost = async (req, res) => {
  try {
    const newPost = await PostModel.create(req.body);
    res.status(200).json(newPost);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getPost = async (req, res) => {
    const id = req.params.id;
  
    try {
      const post = await PostModel.findById(id);
      res.status(200).json(post);
    } catch (error) {
      res.status(400).json(error);
    }
};

export const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
  
    try {
      const post = await PostModel.findById(postId);
      if (post.userId === userId) {
        const updatedPost = await PostModel.findByIdAndUpdate(postId, req.body, {new: true});
        res.status(200).json(updatedPost);
      } else {
        res.status(403).json("Action forbidden");
      }
    } catch (error) {
      res.status(500).json(error);
    }
};