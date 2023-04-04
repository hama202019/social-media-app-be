import express from "express";
import { createChat, userChats } from "../Controllers/chatController.js";

const router = express.Router()

router.post('/', createChat);
router.route('/:userId', userChats);

export default router