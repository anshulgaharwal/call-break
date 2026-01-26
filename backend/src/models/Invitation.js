import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    roomId: { type: String, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
}, {
    timestamps: true,
});

const Invitation = mongoose.model('Invitation', invitationSchema);

export default Invitation;
