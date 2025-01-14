import userController from "./userController.js";
import error from "../../helpers/errors/userErrors.js"

async function getAllUsers(req, res) {
    try {
        const users = await userController.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json(error);
        res.json({ error: error.message });
    }
}

async function getUserById(req, res) {
    try {
        const user = await userController.getUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json(error);
        res.json({ error: error.message });
    }
}

async function getUserByEmail(req, res) {
    try {
        const user = await userController.getUserByEmail(req.params.email);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json(error);
        res.json({ error: error.message });
    }
}

async function getUserByCountry(req, res) {
    try {
        const user = await userController.getUsersByCountry(req.body.country);
    } catch (error) {
        res.status(404).json(error);
        res.json({ error: error.message });
    }
}

async function getUserByCity(req, res) {
    try {
        const user = await userController.getUsersByCity(req.body.city);
    } catch (error) {
        res.status(404).json(error);
        res.json({ error: error.message });
    }
}

async function createUser(req, res) {
    try {
        const user = await userController.createUser(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json(error);
        res.json({ error: error.message });
    }
}
    async function updateUser(req, res) {
        try {
            const user = await userController.updateUser(req.params.id, req.body);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json(error);
            res.json({ error: error.message });
        }
    }


async function deleteUser(req, res) {
    try {
        const user = await userController.deleteUser(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json(error);
        res.json({ error: error.message });
    }
}

export const functions = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByCountry,
    getUserByCity,
    createUser,
    updateUser,
    deleteUser
}

export default functions;