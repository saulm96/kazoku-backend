import projectController from "./projectController.js";
import upload from "../../config/multer.js";
import multer from 'multer';

async function createProject(req, res) {
    try {
        const tempImages = req.files?.images || [];
        const project = await projectController.createProject(
            req.body.name,
            req.body.date,
            req.body.description,
            req.body.status,
            req.body.likes,
            req.body.url,
            req.body.owner,
            req.body.team_members,
            req.body.styles,
            req.body.subjects,
            req.body.types,
            tempImages
        );
        return res.status(201).json(project);
    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || "Internal server error"
        });
    }
}

async function createOwnProject(req, res) {
    try {
        if (!req.user?._id) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        const tempImages = req.files?.images || [];
        const project = await projectController.createProject(
            req.body.name,
            req.body.date,
            req.body.description,
            req.body.status,
            0,
            req.body.url,
            req.user._id,
            req.body.team_members,
            req.body.styles,
            req.body.subjects,
            req.body.types,
            tempImages
        );
        return res.status(201).json(project);
    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || "Internal server error"
        });
    }
}

async function getAllProjects(req, res) {
    try {
        const projects = await projectController.getAllProjects(
            req.query.owner, 
            req.query.category
        );
        return res.status(200).json(projects);
    } catch (error) {
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
        return res.status(200).json(project);
    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || "Internal server error"
        });
    }
}

async function updateProject(req, res) {
    try {
        const projectId = req.params.id;
        const projectData = req.body;
        const newImages = req.files?.images || [];
        
        // Convertir los campos a arrays si son necesarios
        const styles = projectData.styles ? (Array.isArray(projectData.styles) ? projectData.styles : [projectData.styles]) : [];
        const subjects = projectData.subjects ? (Array.isArray(projectData.subjects) ? projectData.subjects : [projectData.subjects]) : [];
        const types = projectData.types ? (Array.isArray(projectData.types) ? projectData.types : [projectData.types]) : [];
        const team_members = projectData.team_members ? (Array.isArray(projectData.team_members) ? projectData.team_members : [projectData.team_members]) : [];
        const existingImages = projectData.existingImages ? (Array.isArray(projectData.existingImages) ? projectData.existingImages : [projectData.existingImages]) : [];

        const updatedProject = await projectController.updateProject(
            projectId,
            projectData.name,
            projectData.date,
            projectData.description,
            projectData.status,
            projectData.likes,
            projectData.url,
            projectData.owner,
            team_members,
            styles,
            subjects,
            types,
            newImages,
            existingImages
        );

        return res.json(updatedProject);
    } catch (error) {
        console.error('Error in updateProject:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Error updating project'
        });
    }
}

async function deleteProject(req, res) {
    try {
        const project = await projectController.deleteProject(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        return res.status(200).json({ message: "Project successfully deleted" });
    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || "Internal server error"
        });
    }
}

async function removeProjectImage(req, res) {
    try {
        const updatedProject = await projectController.removeProjectImage(
            req.params.projectId, 
            req.params.imageId
        );
        return res.status(200).json({
            message: "Image successfully removed",
            project: updatedProject
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || "Internal server error"
        });
    }
}

async function getProyectByMultipleFilters(req, res) {
    try {
        const projects = await projectController.getProyectByMultipleFilters(req.body);
        return res.status(200).json(projects);
    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || "Internal server error"
        });
    }
}

const uploadMiddleware = upload;

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
    createProject,
    createOwnProject,
    getAllProjects,
    getProject,
    updateProject,
    deleteProject,
    removeProjectImage,
    uploadMiddleware,
    handleMulterError,
    getProyectByMultipleFilters
};

export default functions;