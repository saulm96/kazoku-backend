import projectController from "./projectController.js";


    async function createProject(req, res) {
        try {
            const { name, date, description, status, likes, url, owner, team_members } = req.body;
            const project = await projectController.createProject(
                name, date, description, status, likes, url, owner, team_members
            );
            res.status(201).json(project);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }

    async function getAllProjects(req, res) {
        try {
            const {owner, category} = req.body;
            const projects = await projectController.getAllProjects(owner, category);
            res.status(200).json(projects);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    async function getProject(req, res) {
        try {
            const project = await projectController.getProject(req.params.id);
            res.status(200).json(project);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    async function deleteProject(req, res) {
        try {
            const project = await projectController.deleteProject(req.params.id);
            res.status(200).json(project);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }


export const functions = {
    createProject,
    getAllProjects,
    getProject,
    deleteProject
}

export default functions