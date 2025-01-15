import Image from "../../models/imageModel.js";
import imageError from "../../helpers/errors/imageError.js";

async function createImage(name, url) {
    try {
        const image = await Image.create({ name, url});
        if (!image) {
            throw new imageError.IMAGE_CREATE_ERROR();
        }
        return image;
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new imageError.IMAGE_INVALID_DATA(error.message);
        }
        throw new imageError.IMAGE_CREATE_ERROR();
    }
}

async function getAllImages() {
    try {
        const images = await Image.find();
        return images; // Simply return the results, even if empty
    } catch (error) {
        console.error("Error getting images:", error);
        throw new imageError.IMAGE_LIST_ERROR("Failed to retrieve images");
    }
}


async function getImage(id) {
    try {
        const image = await Image.findById(id).populate('owner');
        if (!image) {
            throw new imageError.IMAGE_NOT_FOUND();
        }
        return image;
    } catch (error) {
        if (error.name === 'IMAGE_NOT_FOUND') {
            throw error;
        }
        throw new imageError.IMAGE_NOT_FOUND();
    }
}

async function updateImage(id, name, url) {
    try {
        const image = await Image.findByIdAndUpdate(
            id, 
            { name, url },
            { new: true }
        ).populate('owner');
        if (!image) {
            throw new imageError.IMAGE_NOT_FOUND();
        }
        return image;
    } catch (error) {
        if (error.name === 'IMAGE_NOT_FOUND') {
            throw error;
        }
        if (error.name === 'ValidationError') {
            throw new imageError.IMAGE_INVALID_DATA(error.message);
        }
        throw new imageError.IMAGE_UPDATE_ERROR();
    }
}

async function deleteImage(id) {
    try {
        const image = await Image.findByIdAndDelete(id);
        if (!image) {
            throw new imageError.IMAGE_NOT_FOUND();
        }
        return image;
    } catch (error) {
        if (error.name === 'IMAGE_NOT_FOUND') {
            throw error;
        }
        throw new imageError.IMAGE_DELETE_ERROR();
    }
}

export const functions = {
    createImage,
    getAllImages,
    getImage,
    updateImage,
    deleteImage
}

export default functions;