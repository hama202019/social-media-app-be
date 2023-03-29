import express from "express";
import { createPost, deletePost, getPost, getTimelinePosts, likePost, updatePost } from "../Controllers/postController.js";
const router = express.Router();

router.route('/')
    .post(createPost);
router.route('/:id')
    .get(getPost)
    .put(updatePost)
    .delete(deletePost);
router.route('/like/:id')
    .put(likePost);
router.get("/timeline/:id", getTimelinePosts);

export default router;