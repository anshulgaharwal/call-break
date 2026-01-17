// TODO: User model/schema
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

userSchema.pre(['save', 'update', 'updateOne', 'findOneAndUpdate'], function (next) {
    if (this.getUpdate) {
        this.set({ updatedAt: Date.now() });
    } else {
        this.updatedAt = Date.now();
    }
    next();
});

const User = mongoose.model('User', userSchema);

export default User;
