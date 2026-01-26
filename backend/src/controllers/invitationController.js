import Invitation from "../models/Invitation.js";
import User from "../models/User.js";
import Room from "../models/Room.js";

export const createInvitation = async (req, res) => {
    const username = req.user.username;
    const { receiverUsername, roomId } = req.body;
    try {

        const receiver = await User.findOne({ username: receiverUsername });
        if (!receiver) {
            return res.status(404).json({ error: 'Receiver not found' });
        }
        const room = await Room.findOne({ id: roomId });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        if (room.admin !== username) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const existingInvitation = await Invitation.findOne({ receiverUsername, roomId });
        if (existingInvitation) {
            return res.status(400).json({ error: 'Invitation already sent' });
        }
        const invitation = new Invitation({
            sender: username,
            receiver: receiverUsername,
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
    const username = req.user.username;
    const { invitationId } = req.body;
    try {
        const invitation = await Invitation.findById(invitationId);
        if (!invitation) {
            return res.status(404).json({ error: 'Invitation not found' });
        }
        if (invitation.receiver !== username) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        invitation.status = 'accepted';
        const room = await Room.findOne({ id: invitation.roomId });
        if (!room) {
            return res.status(404).json({ error: 'Room not found' });
        }
        if (room.users.length >= 4) {
            return res.status(401).json({ error: 'Room is full' });
        }
        room.users.push(username);
        await room.save();

        await invitation.save();
        res.status(200).json(invitation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


export const rejectInvitation = async (req, res) => {
    const username = req.user.username;
    const { invitationId } = req.body;
    try {
        const invitation = await Invitation.findById(invitationId);
        if (!invitation) {
            return res.status(404).json({ error: 'Invitation not found' });
        }
        if (invitation.receiver !== username) {
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
    const username = req.user.username;
    try {
        const invitations = await Invitation.find({ receiver: username, status: 'pending' });
        res.status(200).json(invitations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

export const getInvitationsSent = async (req, res) => {
    const username = req.user.username;
    try {
        const invitations = await Invitation.find({ sender: username });
        res.status(200).json(invitations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


export const deleteInvitation = async (req, res) => {
    const username = req.user.username;
    const { invitationId } = req.body;
    try {
        const invitation = await Invitation.findById(invitationId);
        if (!invitation) {
            return res.status(404).json({ error: 'Invitation not found' });
        }
        if (invitation.sender !== username) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        await invitation.deleteOne();
        res.status(200).json({ message: 'Invitation deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

