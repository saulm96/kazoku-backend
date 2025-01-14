class ProjectError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
    }
}

class PROJECT_NOT_FOUND extends ProjectError {
    constructor() {
        super('Project not found', 404);
    }
}

class PROJECT_LIST_ERROR extends ProjectError {
    constructor() {
        super('Error getting projects list', 500);
    }
}

class PROJECT_CREATE_ERROR extends ProjectError {
    constructor() {
        super('Error creating project', 500);
    }
}

class PROJECT_INVALID_DATA extends ProjectError {
    constructor(message = 'Invalid project data provided') {
        super(message, 400);
    }
}

class PROJECT_DELETE_ERROR extends ProjectError {
    constructor(message = 'Error deleting project') {
        super(message, 400);
    }
}

class PROJECT_UPDATE_ERROR extends ProjectError {
    constructor(message = 'Error updating project') {
        super(message, 400);
    }
}

export default {
    PROJECT_NOT_FOUND,
    PROJECT_LIST_ERROR,
    PROJECT_CREATE_ERROR,
    PROJECT_INVALID_DATA,
    PROJECT_DELETE_ERROR,
    PROJECT_UPDATE_ERROR
};