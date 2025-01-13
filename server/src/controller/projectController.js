import Project from "../models/projectModel.js";

class ProjectController {
    static async createProject(name, date, description, status, likes, url, owner, team_members) {
        try {
            return await Project.create({ 
                name, 
                date, 
                description, 
                status, 
                likes, 
                url, 
                owner,
                team_members
            });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getAllProjects(owner, category) {
        try {
            const filter = {};
            if (owner) filter.owner = owner;
            if (category) filter.category = category;
            return await Project.find(filter);
        } catch (error) {
            throw new Error("Error al obtener los proyectos");
        }
    }

    static async getProject(id) {
        try {
            return await Project.findById(id);
        } catch (error) {
            throw new Error("Error al obtener el proyecto");
        }
    }

    static async deleteProject(id) {
        try {
            return await Project.findByIdAndDelete(id);
        } catch (error) {
            throw new Error("Error al eliminar el proyecto");
        }
    }
}

export default ProjectController;