// chatController.js
import Chat from "../../models/chatModel.js";
import chatError from "../../helpers/errors/chatError.js";

async function getById(id) {
    try {
        if (!id) {
            throw new chatError.CHAT_NOT_FOUND();
        }

        console.log('Getting chat by ID:', id);
        const chat = await Chat.findById(id)
            .populate('owner', '-password')
            .populate('client', '-password')
            .populate('project')
            .populate('messages.sender', '-password');
            
        if (!chat) {
            throw new chatError.CHAT_NOT_FOUND();
        }
        return chat;
    } catch (error) {
        console.error('Error getting chat:', error);
        if (error.name === 'CastError') {
            throw new chatError.CHAT_NOT_FOUND();
        }
        throw new chatError.CHAT_LIST_ERROR();
    }
}

async function getAllChatsByUser(userId) {
    try {
        if (!userId) {
            throw new chatError.CHAT_INVALID_DATA('User ID is required');
        }

        console.log('Getting chats for user:', userId);
        const chats = await Chat.find({
            $or: [
                { owner: userId },
                { client: userId }
            ]
        })
        .populate('owner', '-password')
        .populate('client', '-password')
        .populate('project')
        .populate('messages.sender', '-password')
        .sort({ lastActivity: -1, updatedAt: -1 });

        console.log('Found chats:', chats.length);
        return chats;
    } catch (error) {
        console.error('Error getting user chats:', error);
        throw new chatError.CHAT_LIST_ERROR();
    }
}

async function createChat(project, owner, client) {
    try {
        console.log('Creating chat with:', { project, owner, client });

        if (!project || !owner || !client) {
            throw new chatError.CHAT_INVALID_DATA('Todos los campos son requeridos');
        }

        const existingChat = await Chat.findOne({
            project,
            $or: [
                { owner, client },
                { owner: client, client: owner }
            ]
        })
        .populate('owner', '-password')
        .populate('client', '-password')
        .populate('project')
        .populate('messages.sender', '-password');

        if (existingChat) {
            console.log('Existing chat found:', existingChat._id);
            return existingChat;
        }

        const newChat = await Chat.create({
            project,
            owner,
            client,
            messages: [],
            lastActivity: new Date()
        });

        // Poblar las referencias
        const populatedChat = await Chat.findById(newChat._id)
            .populate('owner', '-password')
            .populate('client', '-password')
            .populate('project')
            .populate('messages.sender', '-password');

        console.log('New chat created:', populatedChat._id);
        return populatedChat;
    } catch (error) {
        console.error('Error creating chat:', error);
        if (error.name === 'ValidationError') {
            throw new chatError.CHAT_INVALID_DATA(error.message);
        }
        throw new chatError.CHAT_CREATE_ERROR();
    }
}

async function getAllChats() {
    try {
        console.log('Getting all chats');
        const chats = await Chat.find()
            .populate('owner', '-password')
            .populate('client', '-password')
            .populate('project')
            .populate('messages.sender', '-password')
            .sort({ lastActivity: -1 });
        return chats;
    } catch (error) {
        console.error('Error getting all chats:', error);
        throw new chatError.CHAT_LIST_ERROR();
    }
}

async function addMessage(chatId, message, sender) {
    try {
        console.log('Adding message to chat:', { chatId, sender });
        
        if (!chatId || !message || !sender) {
            console.log('Missing required fields:', { chatId, message, sender });
            throw new chatError.CHAT_INVALID_DATA('ChatId, message y sender son requeridos');
        }

        let chat = await Chat.findById(chatId);
        
        if (!chat) {
            console.log('Chat not found:', chatId);
            throw new chatError.CHAT_NOT_FOUND();
        }

        const isSenderValid = sender.toString() === chat.owner.toString() || 
                            sender.toString() === chat.client.toString();
        
        if (!isSenderValid) {
            console.log('Invalid sender:', { sender, owner: chat.owner, client: chat.client });
            throw new chatError.CHAT_USER_NOT_FOUND();
        }

        const newMessage = {
            message: message,
            sender: sender,
            timestamp: new Date(),
            read: false
        };

        chat.messages.push(newMessage);
        chat.lastActivity = new Date();
        await chat.save();

        // Poblar todas las referencias después de guardar
        chat = await Chat.findById(chatId)
            .populate('owner', '-password')
            .populate('client', '-password')
            .populate('project')
            .populate('messages.sender', '-password');

        return chat;
    } catch (error) {
        console.error('Error adding message:', error);
        if (error instanceof chatError.ChatError) {
            throw error;
        }
        throw new chatError.CHAT_MESSAGE_ERROR(error.message);
    }
}

async function markMessagesAsRead(chatId, userId) {
    try {
        if (!chatId || !userId) {
            throw new chatError.CHAT_INVALID_DATA('ChatId y userId son requeridos');
        }

        const chat = await Chat.findById(chatId);
        
        if (!chat) {
            throw new chatError.CHAT_NOT_FOUND();
        }

        // Verificar que el usuario es parte del chat
        const isParticipant = 
            chat.owner.toString() === userId.toString() || 
            chat.client.toString() === userId.toString();

        if (!isParticipant) {
            throw new chatError.CHAT_USER_NOT_FOUND();
        }

        // Marcar como leídos solo los mensajes del otro usuario
        const updatedChat = await Chat.findOneAndUpdate(
            { _id: chatId },
            {
                $set: {
                    'messages.$[elem].read': true
                }
            },
            {
                arrayFilters: [
                    { 
                        'elem.sender': { $ne: userId },
                        'elem.read': false
                    }
                ],
                new: true
            }
        ).populate('owner', '-password')
         .populate('client', '-password')
         .populate('project')
         .populate('messages.sender', '-password');

        return updatedChat;
    } catch (error) {
        console.error('Error marking messages as read:', error);
        if (error instanceof chatError.ChatError) {
            throw error;
        }
        throw new chatError.CHAT_UPDATE_ERROR(error.message);
    }
}

async function updateChatStatus(chatId, status) {
    try {
        if (!chatId || !status) {
            throw new chatError.CHAT_INVALID_DATA('chatId y status son requeridos');
        }

        let chat = await Chat.findById(chatId);
        
        if (!chat) {
            throw new chatError.CHAT_NOT_FOUND();
        }

        chat.status = status;
        chat.lastActivity = new Date();
        await chat.save();

        // Poblar todas las referencias después de actualizar
        chat = await Chat.findById(chatId)
            .populate('owner', '-password')
            .populate('client', '-password')
            .populate('project')
            .populate('messages.sender', '-password');

        return chat;
    } catch (error) {
        console.error('Error updating chat status:', error);
        if (error instanceof chatError.ChatError) {
            throw error;
        }
        throw new chatError.CHAT_UPDATE_ERROR(error.message);
    }
}

export default {
    createChat,
    getById,
    getAllChatsByUser,
    addMessage,
    getAllChats,
    markMessagesAsRead,
    updateChatStatus
};