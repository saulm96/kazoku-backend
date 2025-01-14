import Project from "../../models/projectModel.js";
import projectError from "../../helpers/projectError.js";

async function createProject(name, date, description, status, likes, url, owner, team_members) {
    try {
        const project = await Project.create({ 
            name, 
            date, 
            description, 
            status, 
            likes, 
            url, 
            owner,
            team_members
        });
        if (!project) {
            throw new projectError.PROJECT_CREATE_ERROR();
        }
        return project;
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new projectError.PROJECT_INVALID_DATA(error.message);
        }
        throw new projectError.PROJECT_CREATE_ERROR();
    }
}

async function getAllProjects(owner, category) {
    try {
        const filter = {};
        if (owner) filter.owner = owner;
        if (category) filter.category = category;
        
        const projects = await Project.find(filter);
        if (!projects.length) {
            throw new projectError.PROJECT_NOT_FOUND();
        }
        return projects;
    } catch (error) {
        if (error.name === 'PROJECT_NOT_FOUND') {
            throw error;
        }
        throw new projectError.PROJECT_LIST_ERROR();
    }
}

async function getProject(id) {
    try {
        const project = await Project.findById(id);
        if (!project) {
            throw new projectError.PROJECT_NOT_FOUND();
        }
        return project;
    } catch (error) {
        if (error.name === 'PROJECT_NOT_FOUND') {
            throw error;
        }
        throw new projectError.PROJECT_NOT_FOUND();
    }
}

async function deleteProject(id) {
    try {
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            throw new projectError.PROJECT_NOT_FOUND();
        }
        return project;
    } catch (error) {
        if (error.name === 'PROJECT_NOT_FOUND') {
            throw error;
        }
        throw new projectError.PROJECT_DELETE_ERROR();
    }
}

export const functions = {
    createProject,
    getAllProjects,
    getProject,
    deleteProject
}

export default functions;