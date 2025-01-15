class CategoryError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
    }
}

class CATEGORY_NOT_FOUND extends CategoryError {
    constructor() {
        super('Category not found', 404);
    }
}

class CATEGORY_LIST_ERROR extends CategoryError {
    constructor() {
        super('Error getting categories list', 500);
    }
}

class CATEGORY_CREATE_ERROR extends CategoryError {
    constructor() {
        super('Error creating category', 500);
    }
}

class CATEGORY_INVALID_DATA extends CategoryError {
    constructor(message = 'Invalid category data provided') {
        super(message, 400);
    }
}

class CATEGORY_DELETE_ERROR extends CategoryError {
    constructor(message = 'Error deleting category') {
        super(message, 400);
    }
}

class CATEGORY_UPDATE_ERROR extends CategoryError {
    constructor(message = 'Error updating category') {
        super(message, 400);
    }
}

export default {
    CATEGORY_NOT_FOUND,
    CATEGORY_LIST_ERROR,
    CATEGORY_CREATE_ERROR,
    CATEGORY_INVALID_DATA,
    CATEGORY_DELETE_ERROR,
    CATEGORY_UPDATE_ERROR
};