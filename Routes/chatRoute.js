import express from "express";
import { createChat } from "../Controllers/chatController.js";

const router = express.Router()

router.post('/', createChat);

export default router