import mongoose from "mongoose";

const StyleSchema = new mongoose.Schema({
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

const Style = mongoose.model('style', StyleSchema);

export default Style;