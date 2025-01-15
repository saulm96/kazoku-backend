import subjectController from "./subjectController.js";

async function createSubject(req, res) {
    try {
        const { name, description } = req.body;
        const subject = await subjectController.createSubject(name, description);
        res.status(201).json(subject);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}

async function getAllSubjects(req, res) {
    try {
        const subjects = await subjectController.getAllSubjects();
        res.status(200).json(subjects);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server not found" });
    }
}

async function getSubject(req, res) {
    try {
        const subject = await subjectController.getSubject(req.params.id);
        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }
        res.status(200).json(subject);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server not found" });
    }
}

async function updateSubject(req, res) {
    try {
        const { name, description } = req.body;
        const subject = await subjectController.updateSubject(
            req.params.id,
            name,
            description
        );
        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }
        res.status(200).json(subject);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server not found" });
    }
}

async function deleteSubject(req, res) {
    try {
        const subject = await subjectController.deleteSubject(req.params.id);
        if (!subject) {
            return res.status(404).json({ message: "Subject not found" });
        }
        res.status(200).json({ message: "Subject successfully deleted" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server not found" });
    }
}

export const functions = {
    createSubject,
    getAllSubjects,
    getSubject,
    updateSubject,
    deleteSubject
}

export default functions