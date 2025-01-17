// controllers/projectApiController.js
import projectController from "./projectController.js";
import upload from "../../config/multer.js";
import multer from 'multer';

async function createProject(req, res) {
    try {
        // Aquí verificamos el contenido del cuerpo de la solicitud
        console.log('Received request body:', req.body);
        console.log('Received files (if any):', req.files);

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
            types 
        } = req.body;

        // req.files.images contiene las imágenes subidas por multer
        const tempImages = req.files?.images || [];
        
        // Llamamos al controlador para crear el proyecto
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
            tempImages
        );
        
        res.status(201).json(project);
    } catch (error) {
        console.error('Error in createProject API:', error);
        return res.status(error.status || 500).json({ 
            message: error.message || "Internal server error" 
        });
    }
}

async function createOwnProject(req, res) {
    try {
        console.log('Creating project for authenticated user');
        console.log('Request user:', req.user);
        
        
        if (!req.user || !req.user._id) {
            return res.status(401).json({ 
                message: "Authentication required" 
            });
        }

        // Extraemos los datos del body, excepto owner que lo tomamos del usuario autenticado
        const { 
            name, 
            date, 
            description, 
            status, 
            likes, 
            url,
            team_members, 
            styles, 
            subjects, 
            types 
        } = req.body;

        // Las imágenes vienen en req.files gracias a multer
        const tempImages = req.files?.images || [];
        
        
        const project = await projectController.createProject(
            name, 
            date, 
            description, 
            status, 
            likes, 
            url, 
            req.user._id, 
            team_members,
            styles,
            subjects,
            types,
            tempImages
        );
        
        res.status(201).json(project);
    } catch (error) {
        console.error('Error in createOwnProject API:', error);
        return res.status(error.status || 500).json({ 
            message: error.message || "Internal server error" 
        });
    }
}

async function getAllProjects(req, res) {
    try {
        const {owner, category} = req.query;
        const projects = await projectController.getAllProjects(owner, category);
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error in getAllProjects API:', error);
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
        console.error('Error in getProject API:', error);
        return res.status(error.status || 500).json({ 
            message: error.message || "Internal server error" 
        });
    }
}

async function updateProject(req, res) {
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
            types 
        } = req.body;

        const tempImages = req.files?.images || [];

        const updatedProject = await projectController.updateProject(
            req.params.id,
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
            tempImages
        );

        res.status(200).json(updatedProject);
    } catch (error) {
        console.error('Error in updateProject API:', error);
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
        console.error('Error in deleteProject API:', error);
        return res.status(error.status || 500).json({ 
            message: error.message || "Internal server error" 
        });
    }
}

async function removeProjectImage(req, res) {
    try {
        const { projectId, imageId } = req.params;
        
        const updatedProject = await projectController.removeProjectImage(projectId, imageId);
        res.status(200).json({
            message: "Image successfully removed",
            project: updatedProject
        });
    } catch (error) {
        console.error('Error in removeProjectImage API:', error);
        return res.status(error.status || 500).json({ 
            message: error.message || "Internal server error" 
        });
    }
}

// Middleware de Multer para la subida de múltiples archivos
const uploadMiddleware = upload;

// Función para manejar errores de Multer
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
    getAllProjects,
    getProject,
    updateProject,
    deleteProject,
    removeProjectImage,
    uploadMiddleware,
    handleMulterError,
    createOwnProject
}

export default functions;