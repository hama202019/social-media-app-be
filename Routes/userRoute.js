import express from "express";
import { deleteUser, getUser, updateUser } from "../Controllers/userController.js";
const router = express.Router();

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);

export default router;