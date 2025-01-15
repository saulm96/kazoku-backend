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
    status: {
        type: String,
        required: false,
    },
    types: [{
        type: String,
        required: false,
    }],
    styles: [{
        type: String,
        required: false,
    }],
    subjects: [{
        type: String,
        required: false,
    }],
   
}, {
    timestamps: true,
});

const Category = mongoose.model('Category', CategorySchema);

export default Category;