// controllers/imageController.js
import Image from "../../models/imageModel.js";
import imageError from "../../helpers/errors/imageError.js";
import fs from 'fs';
import path from 'path';

async function createImage(name, projectId, file) {
    try {
        // La imagen ya está en la carpeta correcta, solo necesitamos crear la URL relativa
        const fileUrl = path.join('archives', projectId, file.filename);
        
        const image = await Image.create({
            name,
            url: fileUrl
        });

        if (!image) {
            // Si falla la creación, eliminar el archivo
            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }
            throw new imageError.IMAGE_CREATE_ERROR();
        }
        
        return image;
    } catch (error) {
        // Asegurarse de eliminar el archivo si algo falla
        if (file && file.path && fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }

        if (error.name === 'ValidationError') {
            throw new imageError.IMAGE_INVALID_DATA(error.message);
        }
        throw new imageError.IMAGE_CREATE_ERROR();
    }
}

async function getAllImages() {
    try {
        const images = await Image.find();
        return images;
    } catch (error) {
        console.error("Error getting images:", error);
        throw new imageError.IMAGE_LIST_ERROR("Failed to retrieve images");
    }
}

async function getImage(id) {
    try {
        const image = await Image.findById(id);
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

async function deleteImage(id) {
    try {
        const image = await Image.findById(id);
        if (!image) {
            throw new imageError.IMAGE_NOT_FOUND();
        }

        // Eliminar el archivo físico
        const filePath = path.join('server/database', image.url);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // Eliminar el registro de la base de datos
        await Image.findByIdAndDelete(id);

        return image;
    } catch (error) {
        if (error.name === 'IMAGE_NOT_FOUND') {
            throw error;
        }
        throw new imageError.IMAGE_DELETE_ERROR();
    }
}

// Función auxiliar para limpiar imágenes temporales
async function cleanupTempImages() {
    const tempDir = 'server/database/archives/temp';
    if (fs.existsSync(tempDir)) {
        const files = fs.readdirSync(tempDir);
        const oneHourAgo = Date.now() - (60 * 60 * 1000);

        files.forEach(file => {
            const filePath = path.join(tempDir, file);
            const stats = fs.statSync(filePath);
            if (stats.mtimeMs < oneHourAgo) {
                fs.unlinkSync(filePath);
            }
        });
    }
}

export const functions = {
    createImage,
    getAllImages,
    getImage,
    deleteImage,
    cleanupTempImages
}

export default functions;