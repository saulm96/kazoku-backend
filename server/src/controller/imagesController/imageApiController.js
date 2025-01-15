import imageController from "./imageController.js";

async function createImage(req, res) {
    try {
        const { name, url } = req.body;
        const image = await imageController.createImage(name, url);
        res.status(201).json(image);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

async function getAllImages(req, res) {
    try {
        const images = await imageController.getAllImages();
        // Return empty array if no images found (not an error)
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
        return res.status(500).json({ message: "server internal error" });
    }
}

async function updateImage(req, res) {
    try {
        const { name, url } = req.body;
        const image = await imageController.updateImage(
            req.params.id,
            name,
            url
        );
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }
        res.status(200).json(image);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "server internal error" });
    }
}

async function deleteImage(req, res) {
    try {
        const image = await imageController.deleteImage(req.params.id);
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }
        res.status(200).json({ message: "Image correctly deleted" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "server internal error" });
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