import express from "express";
import { createChat, findChat, userChats } from "../Controllers/chatController.js";

const router = express.Router()

router.post('/', createChat);
router.route('/:userId', userChats);
router.get('/find/:user1Id/:user2Id', findChat);

export default router