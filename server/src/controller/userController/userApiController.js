import userController from "./userController.js";

async function getAllUsers(req, res) {
    try {
        const users = await userController.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({
            message: error.message || "Internal server error",
            status: error.status || 500
        });
    }
}

async function getUserById(req, res) {
    try {
        const user = await userController.getUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({
            message: error.message || "Internal server error",
            status: error.status || 500
        });
    }
}

async function getUserByEmail(req, res) {
    try {
        const user = await userController.getUserByEmail(req.params.email);
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({
            message: error.message || "Internal server error",
            status: error.status || 500
        });
    }
}

async function getUserByCountry(req, res) {
    try {
        const users = await userController.getUsersByCountry(req.body.country);
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({
            message: error.message || "Internal server error",
            status: error.status || 500
        });
    }
}

async function getUserByCity(req, res) {
    try {
        const users = await userController.getUsersByCity(req.body.city);
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({
            message: error.message || "Internal server error",
            status: error.status || 500
        });
    }
}

async function createUser(req, res) {
    try {
        const user = await userController.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({
            message: error.message || "Internal server error",
            status: error.status || 500
        });
    }
}

async function updateUser(req, res) {
    try {
        const user = await userController.updateUser(req.params.id, req.body);
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({
            message: error.message || "Internal server error",
            status: error.status || 500
        });
    }
}

async function deleteUser(req, res) {
    try {
        await userController.deleteUser(req.params.id);
        res.status(200).json({
            message: "User successfully deleted"
        });
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({
            message: error.message || "Internal server error",
            status: error.status || 500
        });
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
};

export default functions;