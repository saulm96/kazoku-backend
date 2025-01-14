import chatController from "./chatController.js";

async function createChat(req, res) {
    try {
        const { product, buyer, seller } = req.body;
        const chat = await chatController.createChat(product, buyer, seller);
        return res.status(201).json(chat);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}

async function getById(req, res) {
    try {
        const { id } = req.params;
        const chat = await chatController.getById(id);
        if (!chat) {
            return res.status(404).json({
                message: "Chat no encontrado"
            });
        }
        return res.status(200).json(chat);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}

async function getAllChatsByUser(req, res) {
    try {
        const { userId } = req.params;
        const chats = await chatController.getAllChatsByUser(userId);
        return res.status(200).json(chats);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}

async function addMessage(req, res) {
    try {
        const { chatId } = req.params;
        const { message, sender } = req.body;
        const chat = await chatController.addMessage(chatId, message, sender);
        return res.status(200).json(chat);
    } catch (error) {
        console.error(error);
        if (error.message === "El chat no existe") {
            return res.status(404).json({
                message: error.message
            });
        }
        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}

export const functions = {
    createChat,
    addMessage,
    getAllChatsByUser,
    getById
}

export default functions;