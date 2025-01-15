import styleController from "./styleController.js";

async function createStyle(req, res) {
    try {
        const { name, description } = req.body;
        const style = await styleController.createStyle(name, description);
        res.status(201).json(style);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

async function getAllStyles(req, res) {
    try {
        const styles = await styleController.getAllStyles();
        res.status(200).json(styles);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server not found" });
    }
}

async function getStyle(req, res) {
    try {
        const style = await styleController.getStyle(req.params.id);
        if (!style) {
            return res.status(404).json({ message: "Style not found" });
        }
        res.status(200).json(style);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server not found" });
    }
}

async function updateStyle(req, res) {
    try {
        const { name, description } = req.body;
        const style = await styleController.updateStyle(
            req.params.id,
            name,
            description
        );
        if (!style) {
            return res.status(404).json({ message: "Style not found" });
        }
        res.status(200).json(style);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server not found" });
    }
}

async function deleteStyle(req, res) {
    try {
        const style = await styleController.deleteStyle(req.params.id);
        if (!style) {
            return res.status(404).json({ message: "Style not found" });
        }
        res.status(200).json({ message: "Style successfully deleted" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server not found" });
    }
}

export const functions = {
    createStyle,
    getAllStyles,
    getStyle,
    updateStyle,
    deleteStyle
}

export default functions