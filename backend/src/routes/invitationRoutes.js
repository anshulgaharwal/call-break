import express from "express";
import { createInvitation, acceptInvitation, rejectInvitation, getInvitations, getInvitationsSent, deleteInvitation } from "../controllers/invitationController";

const router = express.Router();

router.post("/create", createInvitation);
router.post("/accept", acceptInvitation);
router.post("/reject", rejectInvitation);
router.get("/get", getInvitations);
router.get("/getSent", getInvitationsSent);
router.post("/delete", deleteInvitation);

export default router;