class ImageError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
        this.name = this.constructor.name;
    }
}

class IMAGE_NOT_FOUND extends ImageError {
    constructor() {
        super('Image not found', 404);
    }
}

class IMAGE_LIST_ERROR extends ImageError {
    constructor() {
        super('Error getting images list', 500);
    }
}

class IMAGE_CREATE_ERROR extends ImageError {
    constructor() {
        super('Error creating image', 500);
    }
}

class IMAGE_INVALID_DATA extends ImageError {
    constructor(message = 'Invalid image data provided') {
        super(message, 400);
    }
}

class IMAGE_DELETE_ERROR extends ImageError {
    constructor(message = 'Error deleting image') {
        super(message, 400);
    }
}

class IMAGE_UPDATE_ERROR extends ImageError {
    constructor(message = 'Error updating image') {
        super(message, 400);
    }
}

export default {
    IMAGE_NOT_FOUND,
    IMAGE_LIST_ERROR,
    IMAGE_CREATE_ERROR,
    IMAGE_INVALID_DATA,
    IMAGE_DELETE_ERROR,
    IMAGE_UPDATE_ERROR
};