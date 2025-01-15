import projectController from "./projectController.js";

async function createProject(req, res) {
    try {
        const { 
            name, 
            date, 
            description, 
            status, 
            likes, 
            url, 
            owner, 
            team_members, 
            styles, 
            subjects, 
            types, 
            images 
        } = req.body;
        
        const project = await projectController.createProject(
            name, 
            date, 
            description, 
            status, 
            likes, 
            url, 
            owner,
            team_members,
            styles,
            subjects,
            types,
            images
        );
        
        res.status(201).json(project);
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({ 
            message: error.message || "Internal server error" 
        });
    }
}

async function getAllProjects(req, res) {
    try {
        const {owner, category} = req.body;
        const projects = await projectController.getAllProjects(owner, category);
        res.status(200).json(projects);
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({ 
            message: error.message || "Internal server error" 
        });
    }
}

async function getProject(req, res) {
    try {
        const project = await projectController.getProject(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json(project);
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({ 
            message: error.message || "Internal server error" 
        });
    }
}

async function deleteProject(req, res) {
    try {
        const project = await projectController.deleteProject(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ message: "Project successfully deleted" });
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({ 
            message: error.message || "Internal server error" 
        });
    }
}

export const functions = {
    createProject,
    getAllProjects,
    getProject,
    deleteProject
}

export default functions