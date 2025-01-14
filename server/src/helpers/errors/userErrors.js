class USER_NOT_FOUND extends Error {
    constructor() {
        super('User not found');
        this.status = 404;
    }
}
class EMAIL_ALREADY_EXISTS extends Error {
    constructor() {
        super('Email already exists');
        this.status = 400;
    }
}

class MISSING_USERS_IN_COUNTRY extends Error {
    constructor() {
        super('There are no users in this country');
        this.status = 404;
    }
}

export const errors = {
    USER_NOT_FOUND,
    EMAIL_ALREADY_EXISTS,
    MISSING_USERS_IN_COUNTRY
};

export default errors;