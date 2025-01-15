class StyleError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
    }
}

class STYLE_NOT_FOUND extends StyleError {
    constructor() {
        super('Style not found', 404);
    }
}

class STYLE_LIST_ERROR extends StyleError {
    constructor() {
        super('Error getting styles list', 500);
    }
}

class STYLE_CREATE_ERROR extends StyleError {
    constructor() {
        super('Error creating style', 500);
    }
}

class STYLE_INVALID_DATA extends StyleError {
    constructor(message = 'Invalid style data provided') {
        super(message, 400);
    }
}

class STYLE_DELETE_ERROR extends StyleError {
    constructor(message = 'Error deleting style') {
        super(message, 400);
    }
}

class STYLE_UPDATE_ERROR extends StyleError {
    constructor(message = 'Error updating style') {
        super(message, 400);
    }
}

export default {
    STYLE_NOT_FOUND,
    STYLE_LIST_ERROR,
    STYLE_CREATE_ERROR,
    STYLE_INVALID_DATA,
    STYLE_DELETE_ERROR,
    STYLE_UPDATE_ERROR
};