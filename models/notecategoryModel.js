import mongoose from "mongoose";



const notecategorySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        noteId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'notes',
            required: true,
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'category',
            required: true,
        },
    }
);


export default mongoose.model( 'notecategory', notecategorySchema );