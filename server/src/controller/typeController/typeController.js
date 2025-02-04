import Type from "../../models/typeModel.js";
import typeError from "../../helpers/errors/typeError.js";

async function createType(name, description) {
    try {
        const type = await Type.create({ name, description });
        if (!type) {
            throw new typeError.TYPE_CREATE_ERROR();
        }
        return type;
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new typeError.TYPE_INVALID_DATA(error.message);
        }
        throw new typeError.TYPE_CREATE_ERROR();
    }
}

async function getAllTypes() {
    try {
        const types = await Type.find();
        if (!types.length) {
            throw new typeError.TYPE_NOT_FOUND();
        }
        return types;
    } catch (error) {
        if (error.name === 'TYPE_NOT_FOUND') {
            throw error;
        }
        throw new typeError.TYPE_LIST_ERROR();
    }
}

async function getType(id) {
    try {
        const type = await Type.findById(id);
        if (!type) {
            throw new typeError.TYPE_NOT_FOUND();
        }
        return type;
    } catch (error) {
        if (error.name === 'TYPE_NOT_FOUND') {
            throw error;
        }
        throw new typeError.TYPE_NOT_FOUND();
    }
}

async function updateType(id, name, description) {
    try {
        const type = await Type.findByIdAndUpdate(
            id, 
            { name, description },
            { new: true }
        );
        if (!type) {
            throw new typeError.TYPE_NOT_FOUND();
        }
        return type;
    } catch (error) {
        if (error.name === 'TYPE_NOT_FOUND') {
            throw error;
        }
        if (error.name === 'ValidationError') {
            throw new typeError.TYPE_INVALID_DATA(error.message);
        }
        throw new typeError.TYPE_UPDATE_ERROR();
    }
}

async function deleteType(id) {
    try {
        const type = await Type.findByIdAndDelete(id);
        if (!type) {
            throw new typeError.TYPE_NOT_FOUND();
        }
        return type;
    } catch (error) {
        if (error.name === 'TYPE_NOT_FOUND') {
            throw error;
        }
        throw new typeError.TYPE_DELETE_ERROR();
    }
}

export const functions = {
    createType,
    getAllTypes,
    getType,
    updateType,
    deleteType
}

export default functions