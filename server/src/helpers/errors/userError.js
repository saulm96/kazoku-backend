class UserError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
    }
}

class USER_NOT_FOUND extends UserError {
    constructor() {
        super('User not found', 404);
    }
}

class USER_LIST_ERROR extends UserError {
    constructor() {
        super('Error getting users list', 500);
    }
}

class USER_CREATE_ERROR extends UserError {
    constructor() {
        super('Error creating user', 500);
    }
}

class USER_INVALID_DATA extends UserError {
    constructor(message = 'Invalid user data provided') {
        super(message, 400);
    }
}

class USER_DELETE_ERROR extends UserError {
    constructor(message = 'Error deleting user') {
        super(message, 400);
    }
}

class USER_UPDATE_ERROR extends UserError {
    constructor(message = 'Error updating user') {
        super(message, 400);
    }
}

class EMAIL_ALREADY_EXISTS extends UserError {
    constructor() {
        super('Email already exists', 409);
    }
}

class MISSING_PARAMETERS extends UserError {
    constructor() {
        super('Missing required parameters', 400);
    }
}

class MISSING_USERS_IN_COUNTRY extends UserError {
    constructor() {
        super('No users found in this country', 404);
    }
}

class MISSING_USERS_IN_CITY extends UserError {
    constructor() {
        super('No users found in this city', 404);
    }
}

export default {
    USER_NOT_FOUND,
    USER_LIST_ERROR,
    USER_CREATE_ERROR,
    USER_INVALID_DATA,
    USER_DELETE_ERROR,
    USER_UPDATE_ERROR,
    EMAIL_ALREADY_EXISTS,
    MISSING_PARAMETERS,
    MISSING_USERS_IN_COUNTRY,
    MISSING_USERS_IN_CITY
};