import mongoose from "mongoose";


const imageSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        fileName: {
            type: String,
            required: true,
        },
        filePath: {
            type: String,
            required: true,
        },
    }
);

export default mongoose.model( 'images', imageSchema );