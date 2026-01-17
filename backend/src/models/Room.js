// TODO: Room model/schema
import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    id: { type: String, required: true },
    password: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Room = mongoose.model('Room', roomSchema);

export default Room;
