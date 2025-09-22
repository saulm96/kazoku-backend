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

class USERNAME_ALREADY_EXISTS extends UserError {
    constructor() {
        super('Username already exists', 409);
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
class EMAIL_DOES_NOT_EXIST extends UserError {
    constructor() {
        super('Email does not exist', 404);
    }
}

class INCORRECT_PASSWORD extends UserError {
    constructor() {
        super('Incorrect password', 400);
    }
}

class PASSWORD_DOES_NOT_MATCH extends UserError {
    constructor() {
        super('Passwords do not match', 400);
    }
}
class USER_FOLLOW_ERROR extends UserError {
    constructor() {
        super('Error following user', 500);
    }
}
class USER_LIKE_ERROR extends UserError {
    constructor() {
        super('Error liking project', 500);
    }
}
export class LOCAL_AUTH_NOT_CONFIGURED extends Error {
    constructor() {
        super("This account was created with OAuth. Please use Google or GitHub to sign in, or set up a password first.");
        this.status = 400;
    }
}

export class PROVIDER_ALREADY_LINKED extends Error {
    constructor() {
        super("This provider is already linked to your account.");
        this.status = 400;
    }
}

export class PROVIDER_LINKED_TO_ANOTHER_ACCOUNT extends Error {
    constructor() {
        super("This provider is already linked to another account.");
        this.status = 409;
    }
}

export class CANNOT_UNLINK_LAST_PROVIDER extends Error {
    constructor() {
        super("Cannot unlink the last authentication method. Add another method first.");
        this.status = 400;
    }
}

export class CANNOT_UNLINK_WITHOUT_PASSWORD extends Error {
    constructor() {
        super("Cannot unlink local authentication without setting up a password first.");
        this.status = 400;
    }
}

export class OAUTH_CALLBACK_ERROR extends Error {
    constructor() {
        super("OAuth authentication failed.");
        this.status = 400;
    }
}

export class PROVIDER_DATA_NOT_FOUND extends Error {
    constructor() {
        super("Provider data not found in OAuth response.");
        this.status = 400;
    }
}

export class INVALID_PROVIDER extends Error {
    constructor() {
        super("Invalid authentication provider specified.");
        this.status = 400;
    }
}

export default {
    USER_NOT_FOUND,
    USER_LIST_ERROR,
    USER_CREATE_ERROR,
    USER_INVALID_DATA,
    USER_DELETE_ERROR,
    USER_UPDATE_ERROR,
    USERNAME_ALREADY_EXISTS,
    EMAIL_ALREADY_EXISTS,
    MISSING_PARAMETERS,
    MISSING_USERS_IN_COUNTRY,
    MISSING_USERS_IN_CITY,
    INCORRECT_PASSWORD,
    EMAIL_DOES_NOT_EXIST,
    PASSWORD_DOES_NOT_MATCH,
    USER_FOLLOW_ERROR,
    USER_LIKE_ERROR,
    LOCAL_AUTH_NOT_CONFIGURED,
    PROVIDER_ALREADY_LINKED,
    PROVIDER_LINKED_TO_ANOTHER_ACCOUNT,
    CANNOT_UNLINK_LAST_PROVIDER,
    CANNOT_UNLINK_WITHOUT_PASSWORD,
    OAUTH_CALLBACK_ERROR,
    PROVIDER_DATA_NOT_FOUND,
    INVALID_PROVIDER
};