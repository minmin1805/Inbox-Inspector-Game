import express from "express";
import { gradeInboxReplyController } from "../controllers/aiController.js";

const router = express.Router();

router.post("/grade-inbox-reply", gradeInboxReplyController);

export default router;

