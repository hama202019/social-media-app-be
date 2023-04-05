import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    userName: { type: String, required: true},
    desc: String,
    likes: [],
    image: String,
    ref: String
  }, { timestamps: true }
);

const PostModel = mongoose.model("Post", postSchema);
export default PostModel;