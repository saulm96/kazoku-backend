import mongoose from "mongoose";

const TypeSchema = new mongoose.Schema({
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

const Type = mongoose.model('type', TypeSchema);

export default Type;