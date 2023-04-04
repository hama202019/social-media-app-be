import express from "express";
import { deleteAll, deleteUser, followUser, getAllUsers, getUser, unFollowUser, updateUser } from "../Controllers/userController.js";
const router = express.Router();

router.get('/', getAllUsers)
router.route('/:id')
    .get(getUser)
    .put(updateUser)
    // .delete(deleteUser);
router.put("/follow/:id", followUser);
router.put('/unfollow/:id', unFollowUser);
router.delete('/dd', deleteAll)

export default router;