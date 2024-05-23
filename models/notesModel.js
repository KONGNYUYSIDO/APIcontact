import mongoose from "mongoose";


const notesSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        categories: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'category',
                required: true,
            }
        ],
    }
);

export default mongoose.model( 'notes', notesSchema );