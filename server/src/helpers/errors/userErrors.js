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
export const errors = {
    USER_NOT_FOUND,
};

export default errors;