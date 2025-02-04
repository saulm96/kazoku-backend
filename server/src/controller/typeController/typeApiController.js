import typeController from "./typeController.js";

async function createType(req, res) {
    try {
        const { name, description } = req.body;
        const type = await typeController.createType(name, description);
        res.status(201).json(type);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

async function getAllTypes(req, res) {
    try {
        const types = await typeController.getAllTypes();
        res.status(200).json(types);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server not found" });
    }
}

async function getType(req, res) {
    try {
        const type = await typeController.getType(req.params.id);
        if (!type) {
            return res.status(404).json({ message: "Type not found" });
        }
        res.status(200).json(type);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server not found" });
    }
}

async function updateType(req, res) {
    try {
        const { name, description } = req.body;
        const type = await typeController.updateType(
            req.params.id,
            name,
            description
        );
        if (!type) {
            return res.status(404).json({ message: "Type not found" });
        }
        res.status(200).json(type);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server not found" });
    }
}

async function deleteType(req, res) {
    try {
        const type = await typeController.deleteType(req.params.id);
        if (!type) {
            return res.status(404).json({ message: "Type not found" });
        }
        res.status(200).json({ message: "Type successfully deleted" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server not found" });
    }
}

export const functions = {
    createType,
    getAllTypes,
    getType,
    updateType,
    deleteType
}

export default functions