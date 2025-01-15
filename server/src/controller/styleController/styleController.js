import Style from "../../models/styleModel.js";
import styleError from "../../helpers/errors/styleError.js";

async function createStyle(name, description) {
    try {
        const style = await Style.create({ name, description });
        if (!style) {
            throw new styleError.STYLE_CREATE_ERROR();
        }
        return style;
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new styleError.STYLE_INVALID_DATA(error.message);
        }
        throw new styleError.STYLE_CREATE_ERROR();
    }
}

async function getAllStyles() {
    try {
        const styles = await Style.find();
        if (!styles.length) {
            throw new styleError.STYLE_NOT_FOUND();
        }
        return styles;
    } catch (error) {
        if (error.name === 'STYLE_NOT_FOUND') {
            throw error;
        }
        throw new styleError.STYLE_LIST_ERROR();
    }
}

async function getStyle(id) {
    try {
        const style = await Style.findById(id);
        if (!style) {
            throw new styleError.STYLE_NOT_FOUND();
        }
        return style;
    } catch (error) {
        if (error.name === 'STYLE_NOT_FOUND') {
            throw error;
        }
        throw new styleError.STYLE_NOT_FOUND();
    }
}

async function updateStyle(id, name, description) {
    try {
        const style = await Style.findByIdAndUpdate(
            id, 
            { name, description },
            { new: true }
        );
        if (!style) {
            throw new styleError.STYLE_NOT_FOUND();
        }
        return style;
    } catch (error) {
        if (error.name === 'STYLE_NOT_FOUND') {
            throw error;
        }
        if (error.name === 'ValidationError') {
            throw new styleError.STYLE_INVALID_DATA(error.message);
        }
        throw new styleError.STYLE_UPDATE_ERROR();
    }
}

async function deleteStyle(id) {
    try {
        const style = await Style.findByIdAndDelete(id);
        if (!style) {
            throw new styleError.STYLE_NOT_FOUND();
        }
        return style;
    } catch (error) {
        if (error.name === 'STYLE_NOT_FOUND') {
            throw error;
        }
        throw new styleError.STYLE_DELETE_ERROR();
    }
}

export const functions = {
    createStyle,
    getAllStyles,
    getStyle,
    updateStyle,
    deleteStyle
}

export default functions