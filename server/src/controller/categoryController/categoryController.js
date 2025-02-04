import Category from "../../models/typeModel.js";
import categoryError from "../../helpers/errors/categoryError.js";

async function createCategory(name, description, status) {
    try {
        const category = await Category.create({ name, description, status, types, styles, subjects });
        if (!category) {
            throw new categoryError.CATEGORY_CREATE_ERROR();
        }
        return category;
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new categoryError.CATEGORY_INVALID_DATA(error.message);
        }
        throw new categoryError.CATEGORY_CREATE_ERROR();
    }
}

async function getAllCategories() {
    try {
        const categories = await Category.find();
        if (!categories.length) {
            throw new categoryError.CATEGORY_NOT_FOUND();
        }
        return categories;
    } catch (error) {
        if (error.name === 'CATEGORY_NOT_FOUND') {
            throw error;
        }
        throw new categoryError.CATEGORY_LIST_ERROR();
    }
}

async function getCategory(id) {
    try {
        const category = await Category.findById(id);
        if (!category) {
            throw new categoryError.CATEGORY_NOT_FOUND();
        }
        return category;
    } catch (error) {
        if (error.name === 'CATEGORY_NOT_FOUND') {
            throw error;
        }
        throw new categoryError.CATEGORY_NOT_FOUND();
    }
}

async function updateCategory(id, name, description) {
    try {
        const category = await Category.findByIdAndUpdate(
            id, 
            { name, description },
            { new: true }
        );
        if (!category) {
            throw new categoryError.CATEGORY_NOT_FOUND();
        }
        return category;
    } catch (error) {
        if (error.name === 'CATEGORY_NOT_FOUND') {
            throw error;
        }
        if (error.name === 'ValidationError') {
            throw new categoryError.CATEGORY_INVALID_DATA(error.message);
        }
        throw new categoryError.CATEGORY_UPDATE_ERROR();
    }
}

async function deleteCategory(id) {
    try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            throw new categoryError.CATEGORY_NOT_FOUND();
        }
        return category;
    } catch (error) {
        if (error.name === 'CATEGORY_NOT_FOUND') {
            throw error;
        }
        throw new categoryError.CATEGORY_DELETE_ERROR();
    }
}

export const functions = {
    createCategory,
    getAllCategories,
    getCategory,
    updateCategory,
    deleteCategory
}

export default functions