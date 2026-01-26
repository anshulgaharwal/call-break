import express from "express";
import { createInvitation, acceptInvitation, rejectInvitation, getInvitations, getInvitationsSent, deleteInvitation } from "../controllers/invitationController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/create", createInvitation);
router.post("/accept", acceptInvitation);
router.post("/reject", rejectInvitation);
router.get("/get", getInvitations);
router.get("/getSent", getInvitationsSent);
router.post("/delete", deleteInvitation);

export default router;