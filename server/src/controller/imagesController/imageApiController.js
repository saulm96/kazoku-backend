// controllers/imageApiController.js
import imageController from "./imageController.js";
import upload from "../../config/multer.js";
import multer from 'multer';

async function createImage(req, res) {
    try {
        // Verificamos si hay archivos subidos
        const uploadedImages = req.files?.images;
        if (!uploadedImages || uploadedImages.length === 0) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const { name, projectId } = req.body;
        if (!projectId) {
            return res.status(400).json({ message: "Project ID is required" });
        }

        // Procesamos el primer archivo subido
        const image = await imageController.createImage(name, projectId, uploadedImages[0]);
        res.status(201).json(image);
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({ message: error.message });
    }
}

async function getAllImages(req, res) {
    try {
        const images = await imageController.getAllImages();
        res.status(200).json(images || []);
    } catch (error) {
        console.error("Error in getAllImages:", error);
        return res.status(500).json({ 
            message: "Failed to retrieve images",
            error: error.message 
        });
    }
}

async function getImage(req, res) {
    try {
        const image = await imageController.getImage(req.params.id);
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }
        res.status(200).json(image);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

async function deleteImage(req, res) {
    try {
        const image = await imageController.deleteImage(req.params.id);
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }
        res.status(200).json({ message: "Image successfully deleted" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// Middleware de Multer para la subida de archivos
const uploadMiddleware = upload;

// Función para manejar errores de Multer
const handleMulterError = (error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_COUNT') {
            return res.status(400).json({ message: 'Too many files. Maximum is 4' });
        }
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File too large. Maximum size is 5MB' });
        }
        return res.status(400).json({ message: error.message });
    }
    next(error);
};

export const functions = {
    createImage,
    getAllImages,
    getImage,
    deleteImage,
    uploadMiddleware,
    handleMulterError
}

export default functions;