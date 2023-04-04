import express from 'express';
import { getMessages, postMessage } from '../Controllers/messageController.js';

const router = express.Router();

router.post("/", postMessage);
router.get('/:chatId', getMessages);

export default router;