import express from "express";
import { adminLogin, adminLogout } from "../controllers/userController.js";
import adminAuth from "../middleware/adminAuth.js";

const userRouter = express.Router();

userRouter.post("/login", adminLogin);
userRouter.post("/logout", adminAuth, adminLogout);

export default userRouter;
