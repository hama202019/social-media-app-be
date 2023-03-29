import express from "express";
import { createPost, deletePost, getPost, updatePost } from "../Controllers/postController.js";
const router = express.Router();

router.route('/')
    .post(createPost)
router.route('/:id')
    .get(getPost)
    .put(updatePost)
    .delete(deletePost);

export default router;