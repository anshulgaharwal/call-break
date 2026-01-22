// TODO: Room model/schema
import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    id: { type: String, required: true },
    password: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    users: [{type: String}],
    admin: { type: String, required: true },
});

const Room = mongoose.model('Room', roomSchema);

export default Room;
