// controllers/projectController.js
import Project from "../../models/projectModel.js";
import mongoose from "mongoose";
import fs from 'fs';
import path from 'path';
import projectError from "../../helpers/errors/projectError.js";

function getModels() {
    try {
        return {
            Type: mongoose.model('type'),
            Style: mongoose.model('style'),
            Subject: mongoose.model('subject'),
            User: mongoose.model('User'),
            Image: mongoose.model('Image')
        };
    } catch (error) {
        console.error('Error getting models:', error);
        console.log('Available models:', mongoose.modelNames());
        throw error;
    }
}
async function getProyectByMultipleFilters(filterObj) {
    try {
        const Models = getModels();
        if (!filterObj || Object.keys(filterObj).length === 0) {
            return [];
        }

        const conditions = [];
        
        // Process Type filter
        if (filterObj.Type) {
            const typeNames = filterObj.Type.split(',').map(name => name.trim());
            const types = await Models.Type.find({ name: { $in: typeNames } });
            const typeIds = types.map(type => type._id);
            if (typeIds.length > 0) {
                conditions.push({ types: { $in: typeIds } });
            }
        }

        // Process Style filter
        if (filterObj.Style) {
            const styleNames = filterObj.Style.split(',').map(name => name.trim());
            const styles = await Models.Style.find({ name: { $in: styleNames } });
            const styleIds = styles.map(style => style._id);
            if (styleIds.length > 0) {
                conditions.push({ styles: { $in: styleIds } });
            }
        }

        // Process Subject filter
        if (filterObj.Subject) {
            const subjectNames = filterObj.Subject.split(',').map(name => name.trim());
            const subjects = await Models.Subject.find({ name: { $in: subjectNames } });
            const subjectIds = subjects.map(subject => subject._id);
            if (subjectIds.length > 0) {
                conditions.push({ subjects: { $in: subjectIds } });
            }
        }

        if (conditions.length === 0) {
            return [];
        }

        const projects = await Project.find({ $or: conditions })
            .populate('owner')
            .populate('team_members')
            .populate('styles')
            .populate('subjects')
            .populate('types')

        return projects;

    } catch (error) {
        console.error('Error in getProyectByMultipleFilters:', error);
        throw new projectError.PROJECT_LIST_ERROR(error.message);
    }
}


async function createProject(name, date, description, status, likes, url, owner, team_members, styles, subjects, types, tempImages) {
    try {
        const Models = getModels();
        console.log('\n=== Starting Project Creation ===');

        // Mostrar los datos que se están recibiendo
        console.log('Project data:', {
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
        });

        // Primero creamos el proyecto para obtener el ID
        const projectData = {
            name,
            date: date || new Date(),
            description,
            status: status || 'active',
            likes: parseInt(likes) || 0,
            url,
            owner,
            team_members: team_members ? (Array.isArray(team_members) ? team_members : [team_members]) : [],
            styles: styles ? (Array.isArray(styles) ? styles : [styles]) : [],
            subjects: subjects ? (Array.isArray(subjects) ? subjects : [subjects]) : [],
            types: types ? (Array.isArray(types) ? types : [types]) : [],
            images: []
        };

        console.log('Project data to be created:', projectData);

        const project = await Project.create(projectData);

        if (!project) {
            throw new projectError.PROJECT_CREATE_ERROR();
        }

        console.log('Project created with ID:', project._id);

        // Crear directorio usando el ID del proyecto
        const projectDir = `database/archives/${project._id}`;
        if (!fs.existsSync(projectDir)) {
            fs.mkdirSync(projectDir, { recursive: true });
        }

        // Procesar las imágenes si existen
        if (tempImages && tempImages.length > 0) {
            const imageIds = [];

            for (const tempImage of tempImages) {
                const tempPath = tempImage.path;
                const fileName = path.basename(tempPath);
                const newPath = path.join(projectDir, fileName);

                // Mover archivo de temp a la carpeta del proyecto
                fs.renameSync(tempPath, newPath);
                console.log(`Moved image to: ${newPath}`);

                // Crear registro de imagen en MongoDB
                const image = await Models.Image.create({
                    name: fileName,
                    url: path.join( project._id.toString(), fileName)
                });

                imageIds.push(image._id);
                console.log(`Created image record with ID: ${image._id}`);
            }

            // Actualizar el proyecto con las referencias a las imágenes
            project.images = imageIds;
            await project.save();
            console.log('Project updated with image references');
        }

        // Retornar el proyecto con todos los campos populados
        return await populateProject(project._id);

    } catch (error) {
        console.error('\n=== Error in createProject ===');
        console.error('Error details:', error);

        // Limpiar archivos temporales en caso de error
        if (tempImages && tempImages.length > 0) {
            tempImages.forEach(tempImage => {
                if (fs.existsSync(tempImage.path)) {
                    fs.unlinkSync(tempImage.path);
                    console.log(`Cleaned up temporary file: ${tempImage.path}`);
                }
            });
        }

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
        const Models = getModels();
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
                model: Models.User
            })
            .populate({
                path: 'team_members',
                select: '-password',
                model: Models.User
            })
            .populate({
                path: 'styles',
                model: Models.Style
            })
            .populate({
                path: 'subjects',
                model: Models.Subject
            })
            .populate({
                path: 'types',
                model: Models.Type
            })
            .populate({
                path: 'images',
                model: Models.Image
            });

        return projects;

    } catch (error) {
        console.error('\n=== Error in getAllProjects ===');
        console.error('Error details:', error);
        throw new projectError.PROJECT_LIST_ERROR();
    }
}

async function populateProject(projectId) {
    const Models = getModels();
    return await Project.findById(projectId)
        .populate({
            path: 'owner',
            select: '-password',
            model: Models.User
        })
        .populate({
            path: 'team_members',
            select: '-password',
            model: Models.User
        })
        .populate({
            path: 'styles',
            model: Models.Style
        })
        .populate({
            path: 'subjects',
            model: Models.Subject
        })
        .populate({
            path: 'types',
            model: Models.Type
        })
        .populate({
            path: 'images',
            model: Models.Image
        });
}

async function getProject(id) {
    try {
        console.log('\n=== Getting Project ===');
        console.log('Project ID:', id);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new projectError.PROJECT_INVALID_DATA("Invalid project ID format");
        }

        const project = await populateProject(id);

        if (!project) {
            throw new projectError.PROJECT_NOT_FOUND();
        }

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

async function updateProject(id, name, date, description, status, likes, url, owner, team_members, styles, subjects, types, tempImages = null) {
    try {
        const Models = getModels();
        console.log('\n=== Starting Project Update ===');

        const project = await Project.findById(id);
        if (!project) {
            throw new projectError.PROJECT_NOT_FOUND();
        }

        // Actualizar datos básicos
        project.name = name || project.name;
        project.date = date || project.date;
        project.description = description || project.description;
        project.status = status || project.status;
        project.likes = parseInt(likes) || project.likes;
        project.url = url || project.url;
        project.owner = owner || project.owner;
        project.team_members = team_members ? (Array.isArray(team_members) ? team_members : [team_members]) : project.team_members;
        project.styles = styles ? (Array.isArray(styles) ? styles : [styles]) : project.styles;
        project.subjects = subjects ? (Array.isArray(subjects) ? subjects : [subjects]) : project.subjects;
        project.types = types ? (Array.isArray(types) ? types : [types]) : project.types;

        // Si hay nuevas imágenes, procesarlas
        if (tempImages && tempImages.length > 0) {
            const projectDir = `database/archives/${project._id}`;
            const imageIds = project.images.slice();

            for (const tempImage of tempImages) {
                const tempPath = tempImage.path;
                const fileName = path.basename(tempPath);
                const newPath = path.join(projectDir, fileName);

                // Mover archivo
                fs.renameSync(tempPath, newPath);
                console.log(`Moved new image to: ${newPath}`);

                // Crear registro de imagen
                const image = await Models.Image.create({
                    name: fileName,
                    url: path.join('archives', project._id.toString(), fileName)
                });

                imageIds.push(image._id);
                console.log(`Added new image with ID: ${image._id}`);
            }

            project.images = imageIds;
        }

        await project.save();
        console.log('Project updated successfully');

        return await populateProject(project._id);

    } catch (error) {
        console.error('\n=== Error in updateProject ===');
        console.error('Error details:', error);

        // Limpiar archivos temporales en caso de error
        if (tempImages && tempImages.length > 0) {
            tempImages.forEach(tempImage => {
                if (fs.existsSync(tempImage.path)) {
                    fs.unlinkSync(tempImage.path);
                    console.log(`Cleaned up temporary file: ${tempImage.path}`);
                }
            });
        }

        throw error;
    }
}

async function removeProjectImage(projectId, imageId) {
    try {
        const Models = getModels();
        console.log('\n=== Removing Image from Project ===');

        const project = await Project.findById(projectId);
        if (!project) {
            throw new projectError.PROJECT_NOT_FOUND();
        }

        const image = await Models.Image.findById(imageId);
        if (!image) {
            throw new projectError.PROJECT_INVALID_DATA("Image not found");
        }

        // Verificar que la imagen pertenece al proyecto
        if (!project.images.includes(imageId)) {
            throw new projectError.PROJECT_INVALID_DATA("Image does not belong to this project");
        }

        // Eliminar archivo físico
        const filePath = path.join('database', image.url);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log(`Deleted image file: ${filePath}`);
        }

        // Eliminar referencia de la imagen en el proyecto
        project.images = project.images.filter(img => img.toString() !== imageId.toString());
        await project.save();

        // Eliminar registro de la imagen
        await Models.Image.findByIdAndDelete(imageId);
        console.log('Image removed successfully');

        return await populateProject(projectId);

    } catch (error) {
        console.error('\n=== Error in removeProjectImage ===');
        console.error('Error details:', error);
        throw error;
    }
}

async function deleteProject(id) {
    try {
        const Models = getModels();
        console.log('\n=== Deleting Project ===');
        console.log('Project ID:', id);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new projectError.PROJECT_INVALID_DATA("Invalid project ID format");
        }

        const project = await Project.findById(id);
        if (!project) {
            throw new projectError.PROJECT_NOT_FOUND();
        }

        // Eliminar registros de imágenes primero
        if (project.images && project.images.length > 0) {
            await Models.Image.deleteMany({ _id: { $in: project.images } });
            console.log(`Deleted ${project.images.length} image records from database`);
        }

        // Eliminar directorio de imágenes con manejo de errores
        const projectDir = path.join('database', 'archives', project._id.toString());

        if (fs.existsSync(projectDir)) {
            try {
                // Primero intentamos eliminar todos los archivos individualmente
                const files = fs.readdirSync(projectDir);
                for (const file of files) {
                    const filePath = path.join(projectDir, file);
                    try {
                        // Verificar si es un archivo y eliminarlo
                        const stat = fs.statSync(filePath);
                        if (stat.isFile()) {
                            fs.unlinkSync(filePath);
                            console.log(`Deleted file: ${filePath}`);
                        }
                    } catch (fileError) {
                        console.error(`Error deleting file ${filePath}:`, fileError);
                    }
                }

                // Luego intentamos eliminar el directorio
                fs.rmdirSync(projectDir);
                console.log(`Deleted project directory: ${projectDir}`);
            } catch (dirError) {
                console.error(`Error deleting directory ${projectDir}:`, dirError);

                // Si falla rmdir, intentar con rm -rf equivalente
                try {
                    fs.rmSync(projectDir, { force: true, recursive: true });
                    console.log(`Forcefully deleted project directory: ${projectDir}`);
                } catch (forceError) {
                    console.error(`Failed to forcefully delete directory ${projectDir}:`, forceError);
                }
            }
        }

        // Eliminar el proyecto de la base de datos
        await Project.findByIdAndDelete(id);
        console.log('Project deleted successfully from database');

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

// Función auxiliar para limpiar imágenes temporales
async function cleanupTempImages() {
    const tempDir = `database/archives/temp`;
    if (fs.existsSync(tempDir)) {
        const files = fs.readdirSync(tempDir);
        const oneHourAgo = Date.now() - (60 * 60 * 1000);

        files.forEach(file => {
            const filePath = path.join(tempDir, file);
            const stats = fs.statSync(filePath);
            if (stats.mtimeMs < oneHourAgo) {
                fs.unlinkSync(filePath);
                console.log(`Cleaned up old temporary file: ${filePath}`);
            }
        });
    }
}

export const functions = {
    createProject,
    getAllProjects,
    getProject,
    updateProject,
    deleteProject,
    removeProjectImage,
    cleanupTempImages,
    getProyectByMultipleFilters

}

export default functions;