import chatController from "./chatController.js";

async function createChat(req, res) {
    try {
        const { project, owner, client } = req.body;
        const chat = await chatController.createChat(project, owner, client);
        return res.status(201).json(chat);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server internal error"
        });
    }
}

async function getById(req, res) {
    try {
        const { id } = req.params;
        const chat = await chatController.getById(id);
        if (!chat) {
            return res.status(404).json({
                message: "Chat not found"
            });
        }
        return res.status(200).json(chat);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server internal error"
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
            message: "Server internal error"
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
        if (error.message === "Chat dosen't exist") {
            return res.status(404).json({
                message: error.message
            });
        }
        return res.status(500).json({
            message: "Server internal error"
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