import ProjectController from "./projectController.js";

class ProjectApiController {
    static async createProject(req, res) {
        try {
            const { name, date, description, status, likes, url, owner, team_members } = req.body;
            const project = await ProjectController.createProject(
                name, date, description, status, likes, url, owner, team_members
            );
            res.status(201).json(project);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }

    static async getAllProjects(req, res) {
        try {
            const {owner, category} = req.body;
            const projects = await ProjectController.getAllProjects(owner, category);
            res.status(200).json(projects);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    static async getProject(req, res) {
        try {
            const project = await ProjectController.getProject(req.params.id);
            res.status(200).json(project);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }

    static async deleteProject(req, res) {
        try {
            const project = await ProjectController.deleteProject(req.params.id);
            res.status(200).json(project);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error interno del servidor" });
        }
    }
}

export default ProjectApiController;