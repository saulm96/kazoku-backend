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
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }],
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
    }]
}, {
    timestamps: true,
});

const Project = mongoose.model('Project', ProjectSchema);

export default Project;