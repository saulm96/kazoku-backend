import { Server as socketIo } from "socket.io";
import chatController from "../../src/controller/chatController/chatController.js"; 

export function startSocket(server) {
    console.log('Initializing Socket.IO server...');
    
    const io = new socketIo(server, {
        cors: {
            origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
            allowedHeaders: ["Authorization", "Content-Type"]
        },
        path: '/socket.io',
        allowEIO3: true,
        transports: ['polling', 'websocket'],
        pingTimeout: 60000,
        pingInterval: 25000
    });
    
    console.log('Socket.IO server initialized');
    const users = new Map();

    // Middleware para autenticación
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        console.log('Socket authentication attempt with token:', token ? 'Present' : 'Not present');
        if (!token) {
            return next(new Error('Authentication token required'));
        }
        next();
    });

    io.on("connection", (socket) => {
        console.log("Socket connected with id:", socket.id);
        
        // Registro de usuario
        socket.on("register-socket", (userId) => {
            console.log(`User with id ${userId} connected with socket ${socket.id}`);
            users.set(userId, socket.id);
            console.log('Connected users:', Array.from(users.keys()));
            io.emit("connected-users", Array.from(users.keys()));
        });

        // Unirse a un chat específico
        socket.on("join-chat", (chatId) => {
            socket.join(chatId);
            console.log(`Usuario ${socket.id} se unió al chat: ${chatId}`);
        });

        // Mensaje grupal
        socket.on("group-message", async ({message, senderId, chatId}) => {
            try {
                if (chatId) {
                    await chatController.addMessage(chatId, message, senderId);
                }
                
                io.emit("group-message", {
                    message,
                    senderId,
                    timestamp: new Date()
                });
            } catch (error) {
                console.error('Error en mensaje grupal:', error);
                socket.emit("message-error", { error: "Error al enviar mensaje grupal" });
            }
        });

        socket.on("typing", ({ chatId, userId }) => {
            socket.to(chatId).emit("user-typing", { userId });
        });
        
        socket.on("message-received", ({ chatId, messageId, receiverId }) => {
            const senderSocketId = users.get(receiverId);
            if (senderSocketId) {
                io.to(senderSocketId).emit("message-received", { messageId });
            }
        });
        
        socket.on("message-read", ({ chatId, messageId, senderId }) => {
            const senderSocketId = users.get(senderId);
            if (senderSocketId) {
                io.to(senderSocketId).emit("message-read", { messageId });
            }
        });

        // Mensaje privado
        socket.on("private-message", async ({message, senderId, receiverId, chatId}) => {
            try {
                const receiverSocketId = users.get(receiverId);
                const messageData = {
                    message,
                    senderId,
                    timestamp: new Date()
                };

                if (chatId) {
                    await chatController.addMessage(chatId, message, senderId);
                }

                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("private-message", messageData);
                    socket.emit("message-sent", messageData);
                } else {
                    socket.emit("user-offline", { receiverId });
                }
            } catch (error) {
                console.error('Error en mensaje privado:', error);
                socket.emit("message-error", { error: "Error al enviar mensaje privado" });
            }
        });

        // Desconexión
        socket.on("disconnect", () => {
            console.log("Socket disconnected with id:" + socket.id);
            users.forEach((value, key) => {
                if (value === socket.id) {
                    users.delete(key);
                }
            });
            io.emit("connected-users", Array.from(users.keys()));
        });
    });

    function emitToUser(userId, event, data) {
        const socketId = users.get(userId.toString());
        console.log("Emitting message to", userId, socketId, event);
        if (!socketId) {
            return false;
        }
        io.to(socketId).emit(event, data);
        return true;
    }

    return { io, emitToUser };
}

export default startSocket;