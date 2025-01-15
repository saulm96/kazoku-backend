import Chat from "../../models/chatModel.js";
import chatError from "../../helpers/errors/chatError.js";

async function createChat(product, buyer, seller) {
    try {
        const chat = await Chat.create({
            product,
            buyer,
            seller
        });
        if (!chat) {
            throw new chatError.CHAT_CREATE_ERROR();
        }
        return chat;
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new chatError.CHAT_INVALID_DATA(error.message);
        }
        throw new chatError.CHAT_CREATE_ERROR();
    }
}

async function getById(id) {
    try {
        const chat = await Chat.findById(id);
        if (!chat) {
            throw new chatError.CHAT_NOT_FOUND();
        }
        return chat;
    } catch (error) {
        if (error.name === 'CHAT_NOT_FOUND') {
            throw error;
        }
        throw new chatError.CHAT_NOT_FOUND();
    }
}

async function getAllChatsByUser(userId) {
    try {
        const chats = await Chat.find({
            $or: [
                { buyer: userId },
                { seller: userId }
            ]
        });
        if (!chats.length) {
            throw new chatError.CHAT_NOT_FOUND();
        }
        return chats;
    } catch (error) {
        if (error.name === 'CHAT_NOT_FOUND') {
            throw error;
        }
        throw new chatError.CHAT_LIST_ERROR();
    }
}

async function addMessage(chatId, message, sender) {
    try {
        const chat = await Chat.findById(chatId);
        if (!chat) {
            throw new chatError.CHAT_NOT_FOUND();
        }
        chat.messages.push({ message, sender });
        const updatedChat = await chat.save();
        if (!updatedChat) {
            throw new chatError.CHAT_MESSAGE_ERROR();
        }
        return updatedChat;
    } catch (error) {
        if (error.name === 'CHAT_NOT_FOUND') {
            throw error;
        }
        if (error.name === 'ValidationError') {
            throw new chatError.CHAT_INVALID_DATA(error.message);
        }
        throw new chatError.CHAT_MESSAGE_ERROR();
    }
}

export const functions = {
    createChat,
    addMessage,
    getAllChatsByUser,
    getById
}

export default functions;