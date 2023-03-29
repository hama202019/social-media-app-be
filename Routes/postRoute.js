import express from "express";
import { createPost, getPost } from "../Controllers/postController.js";
const router = express.Router();

router.route('/')
    .post(createPost)
router.route('/:id')
    .get(getPost)

export default router;