import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema({
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    roomId: { type: String, required: true },
}, {
    timestamps: true,
});

const Invitation = mongoose.model('Invitation', invitationSchema);

export default Invitation;
