class SubjectError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
    }
}

class SUBJECT_NOT_FOUND extends SubjectError {
    constructor() {
        super('Subject not found', 404);
    }
}

class SUBJECT_LIST_ERROR extends SubjectError {
    constructor() {
        super('Error getting subjects list', 500);
    }
}

class SUBJECT_CREATE_ERROR extends SubjectError {
    constructor() {
        super('Error creating subject', 500);
    }
}

class SUBJECT_INVALID_DATA extends SubjectError {
    constructor(message = 'Invalid subject data provided') {
        super(message, 400);
    }
}

class SUBJECT_DELETE_ERROR extends SubjectError {
    constructor(message = 'Error deleting subject') {
        super(message, 400);
    }
}

class SUBJECT_UPDATE_ERROR extends SubjectError {
    constructor(message = 'Error updating subject') {
        super(message, 400);
    }
}

export default {
    SUBJECT_NOT_FOUND,
    SUBJECT_LIST_ERROR,
    SUBJECT_CREATE_ERROR,
    SUBJECT_INVALID_DATA,
    SUBJECT_DELETE_ERROR,
    SUBJECT_UPDATE_ERROR
};