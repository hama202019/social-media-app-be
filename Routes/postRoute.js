import express from "express";
import { createPost, deletePost, getPost, likePost, updatePost } from "../Controllers/postController.js";
const router = express.Router();

router.route('/')
    .post(createPost)
router.route('/:id')
    .get(getPost)
    .put(updatePost)
    .delete(deletePost);
router.route('/like/:id')
    .put(likePost)

export default router;