import express from "express";
import { deleteAll, deleteUser, findUsers, followUser, getAllUsers, getUser, unFollowUser, updateUser } from "../Controllers/userController.js";
const router = express.Router();

router.get('/', getAllUsers)
router.route('/:id')
    .get(getUser)
    .put(updateUser)
    // .delete(deleteUser);
router.put("/follow/:id", followUser);
router.put('/unfollow/:id', unFollowUser);
router.delete('/dd', deleteAll)
router.get('/findUsers', findUsers)
export default router;