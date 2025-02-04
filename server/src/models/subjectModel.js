import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true,
    },
    
   
}, {
    timestamps: true,
});

const Subject = mongoose.model('subject', SubjectSchema);

export default Subject;