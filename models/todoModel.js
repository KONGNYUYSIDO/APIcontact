import mongoose from "mongoose";


const TodoSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        task: {
            type: String,
            required: true,
        },
        Status: {
            type: String,
            enum: [ 'pending', 'in_progress', 'completed' ],
            required: true,
        },
        dueDate: {
            type: Date,
        },
        createdAt: {
            type: Date,
        },
    }
);


export default mongoose.model( 'todos', TodoSchema );