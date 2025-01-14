import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});

const Image = mongoose.model('Image', ImageSchema);

export default Image