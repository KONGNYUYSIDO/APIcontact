import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

export default mongoose.model('users', UserSchema);