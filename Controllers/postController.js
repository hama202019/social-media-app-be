import PostModel from "../Models/postModel.js";
import UserModel from "../Models/userModel.js";

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
      res.status(400).json(error);
    }
};

export const deletePost = async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
  
    try {
      const post = await PostModel.findById(id);
      if (post.userId === userId) {
        await post.deleteOne();
        res.status(200).json("Post deleted successfully");
      } else {
        res.status(403).json("Action forbidden");
      }
    } catch (error) {
      res.status(400).json(error);
    }
};

export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  
  try {
      const post = await PostModel.findById(id);
      if (!post.likes.includes(userId)) {
          await post.updateOne({ $push: { likes: userId } });
      } else {
          await post.updateOne({ $pull: { likes: userId } });
      }
      
      const updatedPost = await PostModel.findOne({ _id: id });

      res.status(200).json(updatedPost);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

// export const getTimelinePosts = async (req, res) => {
//     const userId = req.params.id;
  
//     try {
//       const currentUserPosts = await PostModel.find({ userId: userId });
//       const followingPosts = await UserModel.aggregate([
//         {
//           $match: {
//             _id: new mongoose.Types.ObjectId(userId),
//           },
//         },
//         {
//           $lookup: {
//             from: "posts",
//             localField: "following",
//             foreignField: "userId",
//             as: "followingPosts",
//           },
//         },
//         {
//           $project: {
//             followingPosts: 1,
//             _id: 0,
//           },
//         },
//       ]);
  
//       res
//         .status(200)
//         .json(currentUserPosts.concat(...followingPosts[0].followingPosts)
//         .sort((a,b)=>{
//             return b.createdAt - a.createdAt;
//         })
//         );
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   };

export const getTimelinePosts = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await UserModel.findById(userId);
        if(!user) return res.status(404).json({error: "no such user"});
        const userPosts = await PostModel.find({userId});
        const followingPosts = await PostModel.find({"userId": {$in : user.following}});
        res.status(200).json(userPosts.concat(...followingPosts).sort((a, b) => b.createdAt - a.createdAt ));
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}