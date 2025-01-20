import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    read: {
        type: Boolean,
        default: false
    },
    readAt: {
        type: Date,
        default: null
    }
});

const ChatSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'archived', 'closed'],
        default: 'active'
    },
    lastActivity: {
        type: Date,
        default: Date.now
    },
    messages: [MessageSchema]
}, {
    timestamps: true,
});

// Middleware para actualizar lastActivity
ChatSchema.pre('save', function(next) {
    if (this.isModified('messages')) {
        this.lastActivity = Date.now();
    }
    next();
});

// Método para marcar mensajes como leídos
ChatSchema.methods.markMessagesAsRead = async function(userId) {
    try {
        if (!userId) {
            throw new Error('userId es requerido');
        }

        const unreadMessages = this.messages.filter(msg => {
            return msg.sender && !msg.read && msg.sender.toString() !== userId.toString();
        });

       
            if (unreadMessages.length > 0) {
                unreadMessages.forEach(msg => {
                    msg.read = true;
                    msg.readAt = new Date();
                });
    
                await this.save();
            }
    
            return unreadMessages.length;
        } catch (error) {
            console.error('Error en markMessagesAsRead:', error);
            throw error;
        }
    };
    
    // Método para obtener el conteo de mensajes no leídos
    ChatSchema.methods.getUnreadCount = function(userId) {
        if (!userId) return 0;
        
        return this.messages.filter(msg => {
            return msg.sender && 
                   !msg.read && 
                   msg.sender.toString() !== userId.toString();
        }).length;
    };
    
    // Método para obtener el último mensaje
    ChatSchema.methods.getLastMessage = function() {
        if (!this.messages || this.messages.length === 0) {
            return null;
        }
        return this.messages[this.messages.length - 1];
    };
    
    // Método para verificar si un usuario es participante del chat
    ChatSchema.methods.isParticipant = function(userId) {
        if (!userId) return false;
        
        return this.owner.toString() === userId.toString() || 
               this.client.toString() === userId.toString();
    };
    
    // Virtual para obtener el otro participante del chat
    ChatSchema.virtual('otherParticipant').get(function(userId) {
        if (!userId) return null;
        
        return this.owner.toString() === userId.toString() ? this.client : this.owner;
    });
    
    // Índices para mejorar el rendimiento
    ChatSchema.index({ owner: 1, client: 1 });
    ChatSchema.index({ lastActivity: -1 });
    ChatSchema.index({ status: 1 });
    
    const Chat = mongoose.model('Chat', ChatSchema);
    
    export default Chat;