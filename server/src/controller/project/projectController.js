import Project from "../../models/projectModel.js";


    async function createProject(name, date, description, status, likes, url, owner, team_members) {
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

    async function getAllProjects(owner, category) {
        try {
            const filter = {};
            if (owner) filter.owner = owner;
            if (category) filter.category = category;
            return await Project.find(filter);
        } catch (error) {
            throw new Error("Error al obtener los proyectos");
        }
    }

    async function getProject(id) {
        try {
            return await Project.findById(id);
        } catch (error) {
            throw new Error("Error al obtener el proyecto");
        }
    }

    async function deleteProject(id) {
        try {
            return await Project.findByIdAndDelete(id);
        } catch (error) {
            throw new Error("Error al eliminar el proyecto");
        }
    }


    export const functions = {

        createProject,
        getAllProjects,
        getProject,
        deleteProject
    }

    export default functions
