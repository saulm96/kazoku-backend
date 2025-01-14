import Chat from "../../models/chatModel.js";

async function createChat(product, buyer, seller) {
    try {
        return await Chat.create({
            product,
            buyer,
            seller
        });
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getById(id) {
    try {
        return await Chat.findById(id);
    } catch (error) {
        throw new Error("Error al obtener el chat");
    }
}

async function getAllChatsByUser(userId) {
    try {
        return await Chat.find({
            $or: [
                { buyer: userId },
                { seller: userId }
            ]
        });
    } catch (error) {
        throw new Error("Error al obtener los chats del usuario");
    }
}

async function addMessage(chatId, message, sender) {
    try {
        const chat = await Chat.findById(chatId);
        if (!chat) {
            throw new Error("El chat no existe");
        }
        chat.messages.push({ message, sender });
        return await chat.save();
    } catch (error) {
        throw new Error(error.message);
    }
}

export const functions = {
    createChat,
    addMessage,
    getAllChatsByUser,
    getById
}

export default functions;