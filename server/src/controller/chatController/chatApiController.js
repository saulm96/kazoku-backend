// chatApiController.js
import chatController from "./chatController.js";

// En chatApiController.js
async function createChat(req, res) {
    try {
        const { project, owner, client } = req.body;
        console.log('Create chat request:', req.body);

        if (!project || !owner || !client) {
            return res.status(400).json({
                success: false,
                message: "Todos los campos son requeridos",
                data: null
            });
        }

        const chat = await chatController.createChat(project, owner, client);
        console.log('Chat created/found:', chat._id);

        return res.status(201).json({
            success: true,
            data: chat
        });
    } catch (error) {
        console.error('Error in createChat:', error);
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Error interno del servidor",
            data: null
        });
    }
}

async function getAllChats(req, res) {
    try {
        const chats = await chatController.getAllChats();
        return res.status(200).json({
            success: true,
            data: chats
        });
    } catch (error) {
        console.error('Error in getAllChats:', error);
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Error interno del servidor"
        });
    }
}

async function getById(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Chat ID is required"
            });
        }

        const chat = await chatController.getById(id);
        return res.status(200).json({
            success: true,
            data: chat
        });
    } catch (error) {
        console.error('Error in getById:', error);
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Error interno del servidor"
        });
    }
}

async function getAllChatsByUser(req, res) {
    try {
        const { userId } = req.params;
        
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "UserId es requerido",
                data: []
            });
        }

        const chats = await chatController.getAllChatsByUser(userId);
        
        return res.status(200).json({
            success: true,
            data: chats
        });
    } catch (error) {
        console.error('Error in getAllChatsByUser:', error);
        return res.status(500).json({
            success: false,
            message: error.message || "Error interno del servidor",
            data: []
        });
    }
}

async function addMessage(req, res) {
    try {
        const { chatId } = req.params;
        const { message } = req.body;
        const sender = req.user._id;

        if (!chatId || !message || !sender) {
            return res.status(400).json({
                success: false,
                message: "ChatId, message y sender son requeridos"
            });
        }

        const updatedChat = await chatController.addMessage(chatId, message, sender);
        return res.status(200).json({
            success: true,
            data: updatedChat
        });
    } catch (error) {
        console.error('Error in addMessage:', error);
        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Error al añadir mensaje"
        });
    }
}

export default {
    createChat,
    getAllChats,
    getById,
    getAllChatsByUser,
    addMessage
};