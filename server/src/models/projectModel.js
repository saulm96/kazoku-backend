// models/projectModel.js
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
        ref: 'User',         // Este está bien, coincide con userModel.js
        required: true,
    },
    team_members:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',         // Este también está bien
    }],
    types: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'type',         // Cambiado a minúscula para coincidir con typeModel.js
        required: true,
    }],
    styles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'style',        // Cambiado a minúscula para coincidir con styleModel.js
        required: true,
    }],
    subjects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subject',      // Cambiado a minúscula para coincidir con subjectModel.js
        required: true,
    }],
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'image',        // Cambiado a minúscula para coincidir con imageModel.js
        required: true,
    }]
}, {
    timestamps: true,
});

const Project = mongoose.model('Project', ProjectSchema);

export default Project;