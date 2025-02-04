import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
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

const Category = mongoose.model('type', CategorySchema);

export default Category;