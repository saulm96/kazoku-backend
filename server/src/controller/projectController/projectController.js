// projectController.js
import Project from "../../models/projectModel.js";
import projectError from "../../helpers/errors/projectError.js";
import mongoose from "mongoose";

async function createProject(name, date, description, status, likes, url, owner, team_members, styles, subjects, types, images) {
    try {
        // Función de validación mejorada para IDs
        const validateId = (id) => {
            if (!id) return false;
            const stringId = id.toString().trim();
            return mongoose.Types.ObjectId.isValid(stringId);
        };

        const validateIdsArray = (arr, fieldName) => {
            console.log(`Validating ${fieldName}:`, arr);
            
            if (!arr) return [];
            if (!Array.isArray(arr)) {
                arr = [arr]; // Convertir valor único en array
            }
            
            // Filtrar valores válidos
            const validIds = arr.filter(id => id && validateId(id));
            console.log(`Valid ${fieldName} IDs:`, validIds);
            
            return validIds;
        };

        // Validar owner
        if (owner && !validateId(owner)) {
            throw new projectError.PROJECT_INVALID_DATA("Invalid owner ID format");
        }

        // Procesar y validar arrays
        const validatedTeamMembers = validateIdsArray(team_members, 'team_members');
        const validatedStyles = validateIdsArray(styles, 'styles');
        const validatedTypes = validateIdsArray(types, 'types');
        const validatedSubjects = validateIdsArray(subjects, 'subjects');
        const validatedImages = validateIdsArray(images, 'images');

        // Crear el proyecto con los datos validados
        const projectData = {
            name: name || '',
            date: date || new Date(),
            description: description || '',
            status: status || 'active',
            likes: likes || 0,
            url: url || '',
            owner: owner || null,
            team_members: validatedTeamMembers,
            styles: validatedStyles,
            subjects: validatedSubjects,
            types: validatedTypes,
            images: validatedImages
        };

        console.log('Creating project with data:', projectData);

        const project = await Project.create(projectData);

        if (!project) {
            throw new projectError.PROJECT_CREATE_ERROR();
        }

        // Populate all references
        const populatedProject = await project.populate([
            { path: 'owner', select: '-password' },
            { path: 'team_members', select: '-password' },
            { path: 'styles' },
            { path: 'subjects' },
            { path: 'types' },
            { path: 'images' }
        ]);

        console.log('Project created successfully:', populatedProject);

        return populatedProject;

    } catch (error) {
        console.error('Detailed error in createProject:', error);
        
        if (error.name === 'ValidationError') {
            throw new projectError.PROJECT_INVALID_DATA(error.message);
        }
        if (error instanceof projectError.PROJECT_INVALID_DATA) {
            throw error;
        }
        if (error.code === 11000) {
            throw new projectError.PROJECT_INVALID_DATA('Duplicate key error');
        }
        
        throw new projectError.PROJECT_CREATE_ERROR();
    }
}

async function getAllProjects(owner, category) {
    try {
        const filter = {};
        if (owner) {
            if (!mongoose.Types.ObjectId.isValid(owner)) {
                throw new projectError.PROJECT_INVALID_DATA("Invalid owner ID format");
            }
            filter.owner = owner;
        }
        if (category) filter.category = category;

        const projects = await Project.find(filter)
            .populate('owner', '-password')
            .populate('team_members', '-password')
            .populate('styles')
            .populate('subjects')
            .populate('types')
            .populate('images');

        if (!projects.length) {
            throw new projectError.PROJECT_NOT_FOUND();
        }

        return projects;
    } catch (error) {
        console.error('Error in getAllProjects:', error);
        if (error.name === 'PROJECT_NOT_FOUND') {
            throw error;
        }
        throw new projectError.PROJECT_LIST_ERROR();
    }
}

async function getProject(id) {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new projectError.PROJECT_INVALID_DATA("Invalid project ID format");
        }

        const project = await Project.findById(id)
            .populate('owner', '-password')
            .populate('team_members', '-password')
            .populate('styles')
            .populate('subjects')
            .populate('types')
            .populate('images');

        if (!project) {
            throw new projectError.PROJECT_NOT_FOUND();
        }

        return project;
    } catch (error) {
        console.error('Error in getProject:', error);
        if (error.name === 'PROJECT_NOT_FOUND' || error.name === 'PROJECT_INVALID_DATA') {
            throw error;
        }
        throw new projectError.PROJECT_NOT_FOUND();
    }
}

async function deleteProject(id) {
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new projectError.PROJECT_INVALID_DATA("Invalid project ID format");
        }

        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            throw new projectError.PROJECT_NOT_FOUND();
        }
        return project;
    } catch (error) {
        console.error('Error in deleteProject:', error);
        if (error.name === 'PROJECT_NOT_FOUND' || error.name === 'PROJECT_INVALID_DATA') {
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

export default functions