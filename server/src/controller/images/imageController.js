import Image from "../../models/imageModel.js";

async function createImage(name, url, owner) {
    try {
        return await Image.create({ name, url, owner });
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getAllImages() {
    try {
        return await Image.find().populate('owner');
    } catch (error) {
        throw new Error("Error al obtener las imágenes");
    }
}

async function getImage(id) {
    try {
        return await Image.findById(id).populate('owner');
    } catch (error) {
        throw new Error("Error al obtener la imagen");
    }
}

async function updateImage(id, name, url) {
    try {
        return await Image.findByIdAndUpdate(
            id, 
            { name, url },
            { new: true }
        ).populate('owner');
    } catch (error) {
        throw new Error("Error al actualizar la imagen");
    }
}

async function deleteImage(id) {
    try {
        return await Image.findByIdAndDelete(id);
    } catch (error) {
        throw new Error("Error al eliminar la imagen");
    }
}

export const functions = {
    createImage,
    getAllImages,
    getImage,
    updateImage,
    deleteImage
}

export default functions