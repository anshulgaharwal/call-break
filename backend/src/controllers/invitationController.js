import Invitation from "../models/Invitation.js";
import User from "../models/User.js";
import Room from "../models/Room.js";

export const createInvitation = async (req, res) => {
    const userId = req.user.id;
    const { receiverId, roomId } = req.body;
    try {

        const receiver = await User.findById(receiverId);
        if (!receiver) {
            return res.status(404).json({ error: 'Receiver not found' });
        }
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        if (room.hostId !== userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const existingInvitation = await Invitation.findOne({ receiverId, roomId });
        if (existingInvitation) {
            return res.status(400).json({ error: 'Invitation already sent' });
        }
        const invitation = new Invitation({
            senderId: userId,
            receiverId,
            roomId,
        });
        await invitation.save();
        res.status(201).json(invitation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const acceptInvitation = async (req, res) => {
    const userId = req.user.id;
    const { invitationId } = req.body;
    try {
        const invitation = await Invitation.findById(invitationId);
        if (!invitation) {
            return res.status(404).json({ error: 'Invitation not found' });
        }
        if (invitation.receiverId !== userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        invitation.status = 'accepted';
        await invitation.save();
        res.status(200).json(invitation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


export const rejectInvitation = async (req, res) => {
    const userId = req.user.id;
    const { invitationId } = req.body;
    try {
        const invitation = await Invitation.findById(invitationId);
        if (!invitation) {
            return res.status(404).json({ error: 'Invitation not found' });
        }
        if (invitation.receiverId !== userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        invitation.status = 'rejected';
        await invitation.save();
        res.status(200).json(invitation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const getInvitations = async (req, res) => {
    const userId = req.user.id;
    try {
        const invitations = await Invitation.find({ receiverId: userId });
        res.status(200).json(invitations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const getInvitationsSent = async (req, res) => {
    const userId = req.user.id;
    try {
        const invitations = await Invitation.find({ senderId: userId });
        res.status(200).json(invitations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


export const deleteInvitation = async (req, res) => {
    const userId = req.user.id;
    const { invitationId } = req.body;
    try {
        const invitation = await Invitation.findById(invitationId);
        if (!invitation) {
            return res.status(404).json({ error: 'Invitation not found' });
        }
        if (invitation.senderId !== userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        await invitation.deleteOne();
        res.status(200).json({ message: 'Invitation deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

