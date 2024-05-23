import mongoose from "mongoose";


const categorySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    }
);


export default mongoose.model( 'category', categorySchema );