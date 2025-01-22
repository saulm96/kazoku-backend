import userController from "./userController.js";

import upload from "../../config/multer.js";

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
async function getUserBySpecialization(req, res) {
    try {
        const users = await userController.getUserBySpecialization(req.body.specialization);
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({
            message: error.message || "Internal server error",
            status: error.status || 500
        });
    }
}
async function getUserByUsername(req, res) {
    try {
        console.log("Request body:", req.params); // Debug line

        const user = await userController.getUserByUsername(req.params.username);
        res.status(200).json({
            userId: user._id,
            user_name: user.name,
            user_lastName: user.lastname,
            username: user.username,
        });
    } catch (error) {
        console.error("Error in getUserByUsername:", error);
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
        const userData = req.body
        if (req.file) {
            userData.file = req.file
        }

        const updatedUser = await userController.updateUser(req.params.id, userData);
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        return res.status(error.status || 500).json({
            message: error.message || "Internal server error",
            status: error.status || 500
        });
    }
}

async function updateAvatarFromUser(req, res) {
    try {
        // Check for file
        if (!req.file) {
            return res.status(400).json({
                message: "Missing avatar image",
                status: 400
            });
        }

        // Fix typo in req.user
        const userId = req.user._id; // Was req-user._id

        const avatarUrl = `archives/avatars/${req.file.filename}`;

        const updatedUser = await userController.updateUser(userId, { avatar: avatarUrl });

        res.status(200).json({
            success: true,
            data: updatedUser
        });

    } catch (error) {
        console.error('Error updating avatar:', error);
        // Fix typo in json()
        res.status(500).json({ // Was status(500),json
            success: false,
            message: error.message || "Internal server error"
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

async function followUnfollowSystem(req, res) {
    try {
        // mainUserId comes from JWT token via auth middleware
        const mainUserId = req.body.mainUserId;
        // userId to follow/unfollow comes from URL params
        const userId = req.body.userId;

        if (!userId) {
            return res.status(400).json({
                message: "Missing user ID to follow/unfollow",
                status: 400
            });
        }

        const result = await userController.followUnfollowSystem(mainUserId, userId);
        return res.status(200).json(result);
    } catch (error) {
        console.error("Follow error:", error);
        return res.status(error.status || 500).json({
            message: error.message || "Internal server error",
            status: error.status || 500
        });
    }
}

async function likeProject(req, res) {
    try {
        const userId = req.body.userId;
        const projectId = req.body.projectId;

        if (!userId || !projectId) {
            return res.status(400).json({
                message: "Missing user ID or project ID to like/unlike",
                status: 400
            });
        }
        const result = await userController.likeProject(userId, projectId);
        return res.status(200).json(result);
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
    getUserBySpecialization,
    getUserByUsername,
    getUserById,
    getUserByEmail,
    getUserByCountry,
    getUserByCity,
    createUser,
    updateUser,
    updateAvatarFromUser,
    deleteUser,
    followUnfollowSystem,
    likeProject
};

export default functions;