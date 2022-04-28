import express from "express";
import { refreshToken } from "../controllers/RefreshTokenController.js";
import { getUsers, login, logout, registerUser } from "../controllers/userController.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();


router.get('/users', verifyToken, getUsers)
router.post('/users', registerUser)
router.post('/login', login)
router.get('/token', refreshToken)
router.get('/logout', logout)

export default router;