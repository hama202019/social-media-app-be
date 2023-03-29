import express from "express";
import { createPost, getPost, updatePost } from "../Controllers/postController.js";
const router = express.Router();

router.route('/')
    .post(createPost)
router.route('/:id')
    .get(getPost)
    .put(updatePost)

export default router;