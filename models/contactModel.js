import mongoose from "mongoose";

const relationshipOptions = ['Family', 'Friend', 'Colleague', 'Other'];

const ContactSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        firstName: {
            type: String,
            required: true,
            max: 30,
        },
        surName: {
            type: String,
            required: true,
            max: 30,
        },
        emailAddress: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        phoneNumber1: {
            type: String,
            required: true,
        },
        phoneNumber2: {
            type: String,
        },
        address: {
            type: String,
            required: true,
        },
        company: {
            type: String,
        },
        birthday: {
            type: Date,
        },
        jobTitle: {
            type: String,
        },
        relationship: {
            type: String,
            enum: relationshipOptions,
            default: 'Other'
        }
    }
);

export default mongoose.model('contact', ContactSchema);

// module.exports = Contact;