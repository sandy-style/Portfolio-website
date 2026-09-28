import express from "express";
import {
  listProject,
  removeProject,
  updateProject,
  uploadProject,
} from "../controllers/uploadController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const uploadRouter = express.Router();

uploadRouter.post(
  "/upload",
  adminAuth,
  upload.fields([{ name: "image1", maxCount: 1 }]),
  uploadProject,
);
uploadRouter.post(
  "/update",
  adminAuth,
  upload.fields([{ name: "image1", maxCount: 1 }]),

  updateProject,
);
uploadRouter.get("/list", listProject);
uploadRouter.post("/remove", adminAuth, removeProject);

export default uploadRouter;
