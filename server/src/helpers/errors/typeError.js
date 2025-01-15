class TypeError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
    }
}

class TYPE_NOT_FOUND extends TypeError {
    constructor() {
        super('Type not found', 404);
    }
}

class TYPE_LIST_ERROR extends TypeError {
    constructor() {
        super('Error getting types list', 500);
    }
}

class TYPE_CREATE_ERROR extends TypeError {
    constructor() {
        super('Error creating type', 500);
    }
}

class TYPE_INVALID_DATA extends TypeError {
    constructor(message = 'Invalid type data provided') {
        super(message, 400);
    }
}

class TYPE_DELETE_ERROR extends TypeError {
    constructor(message = 'Error deleting type') {
        super(message, 400);
    }
}

class TYPE_UPDATE_ERROR extends TypeError {
    constructor(message = 'Error updating type') {
        super(message, 400);
    }
}

export default {
    TYPE_NOT_FOUND,
    TYPE_LIST_ERROR,
    TYPE_CREATE_ERROR,
    TYPE_INVALID_DATA,
    TYPE_DELETE_ERROR,
    TYPE_UPDATE_ERROR
};
