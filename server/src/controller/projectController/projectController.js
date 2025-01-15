// projectController.js
import Project from "../../models/projectModel.js";
import Type from "../../models/typeModel.js";
import Style from "../../models/styleModel.js";
import Subject from "../../models/subjectModel.js";
import User from "../../models/userModel.js";
import Image from "../../models/imageModel.js";
import projectError from "../../helpers/errors/projectError.js";
import mongoose from "mongoose";


async function createProject(name, date, description, status, likes, url, owner, team_members, styles, subjects, types, images) {
    try {
        console.log('\n=== Starting Project Creation ===');
        console.log('Received styles:', styles);

        
        console.log('\n=== Style Model Check ===');
        console.log('Style model name:', Style.modelName);
        console.log('Style model schema:', Style.schema.obj);

        let styleId;
        if (Array.isArray(styles)) {
            styleId = styles[0];
        } else {
            styleId = styles;
        }

        
        console.log('\n=== Style Verification ===');
        const styleDoc = await Style.findById(styleId);
        console.log('Found style document:', styleDoc);

        
        const validTeamMembers = team_members ? (Array.isArray(team_members) ? team_members : [team_members]) : [];
        const validStyles = styles ? (Array.isArray(styles) ? styles : [styles]) : [];
        const validSubjects = subjects ? (Array.isArray(subjects) ? subjects : [subjects]) : [];
        const validTypes = types ? (Array.isArray(types) ? types : [types]) : [];
        const validImages = images ? (Array.isArray(images) ? images : [images]) : [];

        
        const projectData = {
            name: name || '',
            date: date || new Date(),
            description: description || '',
            status: status || 'active',
            likes: parseInt(likes) || 0,
            url: url || '',
            owner: owner,
            team_members: validTeamMembers.filter(Boolean),
            styles: validStyles.filter(Boolean),
            subjects: validSubjects.filter(Boolean),
            types: validTypes.filter(Boolean),
            images: validImages.filter(Boolean)
        };

        console.log('\n=== Project Data ===');
        console.log('Project data to save:', JSON.stringify(projectData, null, 2));

        const project = await Project.create(projectData);

        if (!project) {
            throw new projectError.PROJECT_CREATE_ERROR();
        }

        console.log('\n=== Project Created ===');
        console.log('Project before population:', project);

        
        console.log('\n=== Starting Population ===');
        
        const populatedProject = await Project.findById(project._id)
            .populate({
                path: 'styles',
                model: Style,
                options: { lean: true }
            })
            .populate({
                path: 'owner',
                select: '-password',
                model: User
            })
            .populate({
                path: 'team_members',
                select: '-password',
                model: User
            })
            .populate({
                path: 'subjects',
                model: Subject
            })
            .populate({
                path: 'types',
                model: Type
            })
            .populate({
                path: 'images',
                model: Image
            });

        console.log('\n=== Population Results ===');
        console.log('Populated styles:', populatedProject.styles);

        // Verificación adicional si los styles están vacíos
        if (!populatedProject.styles.length) {
            console.log('\n=== Style Population Debug ===');
            const rawProject = await Project.findById(project._id).lean();
            console.log('Raw project styles:', rawProject.styles);
            
            const styleCheck = await Style.find({
                '_id': { $in: rawProject.styles }
            });
            console.log('Style documents found:', styleCheck);
        }

        return populatedProject;

    } catch (error) {
        console.error('\n=== Error in createProject ===');
        console.error('Error details:', error);
        
        if (error.name === 'ValidationError') {
            throw new projectError.PROJECT_INVALID_DATA(error.message);
        }
        if (error instanceof projectError.PROJECT_INVALID_DATA) {
            throw error;
        }
        if (error.code === 11000) {
            throw new projectError.PROJECT_INVALID_DATA('Duplicate key error');
        }
        
        throw new projectError.PROJECT_CREATE_ERROR(error.message);
    }
}

async function getAllProjects(owner, category) {
    try {
        console.log('\n=== Getting All Projects ===');
        const filter = {};
        
        if (owner) {
            if (!mongoose.Types.ObjectId.isValid(owner)) {
                throw new projectError.PROJECT_INVALID_DATA("Invalid owner ID");
            }
            filter.owner = owner;
        }
        
        if (category) {
            filter.category = category;
        }

        console.log('Using filter:', filter);

        const projects = await Project.find(filter)
            .populate({
                path: 'owner',
                select: '-password',
                model: User
            })
            .populate({
                path: 'team_members',
                select: '-password',
                model: User
            })
            .populate({
                path: 'styles',
                model: Style
            })
            .populate({
                path: 'subjects',
                model: Subject
            })
            .populate({
                path: 'types',
                model: Type
            })
            .populate({
                path: 'images',
                model: Image
            });

        console.log(`Found ${projects.length} projects`);

        if (!projects.length) {
            throw new projectError.PROJECT_NOT_FOUND();
        }

        return projects;

    } catch (error) {
        console.error('\n=== Error in getAllProjects ===');
        console.error('Error details:', error);
        
        if (error.name === 'PROJECT_NOT_FOUND') {
            throw error;
        }
        throw new projectError.PROJECT_LIST_ERROR();
    }
}

async function getProject(id) {
    try {
        console.log('\n=== Getting Project ===');
        console.log('Project ID:', id);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new projectError.PROJECT_INVALID_DATA("Invalid project ID format");
        }

        const project = await Project.findById(id)
            .populate({
                path: 'owner',
                select: '-password',
                model: User
            })
            .populate({
                path: 'team_members',
                select: '-password',
                model: User
            })
            .populate({
                path: 'styles',
                model: Style
            })
            .populate({
                path: 'subjects',
                model: Subject
            })
            .populate({
                path: 'types',
                model: Type
            })
            .populate({
                path: 'images',
                model: Image
            });

        if (!project) {
            console.log('Project not found');
            throw new projectError.PROJECT_NOT_FOUND();
        }

        console.log('Project found and populated successfully');
        return project;

    } catch (error) {
        console.error('\n=== Error in getProject ===');
        console.error('Error details:', error);
        
        if (error.name === 'PROJECT_NOT_FOUND' || error.name === 'PROJECT_INVALID_DATA') {
            throw error;
        }
        throw new projectError.PROJECT_NOT_FOUND();
    }
}

async function deleteProject(id) {
    try {
        console.log('\n=== Deleting Project ===');
        console.log('Project ID to delete:', id);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new projectError.PROJECT_INVALID_DATA("Invalid project ID format");
        }

        const project = await Project.findByIdAndDelete(id);
        
        if (!project) {
            console.log('Project not found for deletion');
            throw new projectError.PROJECT_NOT_FOUND();
        }

        console.log('Project deleted successfully');
        return project;

    } catch (error) {
        console.error('\n=== Error in deleteProject ===');
        console.error('Error details:', error);
        
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