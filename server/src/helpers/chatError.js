class ChatError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
    }
}

class CHAT_NOT_FOUND extends ChatError {
    constructor() {
        super('Chat not found', 404);
    }
}

class CHAT_LIST_ERROR extends ChatError {
    constructor() {
        super('Error getting chats list', 500);
    }
}

class CHAT_CREATE_ERROR extends ChatError {
    constructor() {
        super('Error creating chat', 500);
    }
}

class CHAT_INVALID_DATA extends ChatError {
    constructor(message = 'Invalid chat data provided') {
        super(message, 400);
    }
}

class CHAT_MESSAGE_ERROR extends ChatError {
    constructor(message = 'Error adding message to chat') {
        super(message, 400);
    }
}

class CHAT_USER_NOT_FOUND extends ChatError {
    constructor() {
        super('User not found in chat', 404);
    }
}

export default {
    CHAT_NOT_FOUND,
    CHAT_LIST_ERROR,
    CHAT_CREATE_ERROR,
    CHAT_INVALID_DATA,
    CHAT_MESSAGE_ERROR,
    CHAT_USER_NOT_FOUND
};