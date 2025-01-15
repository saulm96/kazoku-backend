import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
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
    status: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0
    },
    url: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    team_members:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        
    }],
    types: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Type',
        required: true,
    }],
    styles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Style',
        required: true,
    }],
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
    }],
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
        required: true,
    }]
}, {
    timestamps: true,
});

const Project = mongoose.model('Project', ProjectSchema);

export default Project;