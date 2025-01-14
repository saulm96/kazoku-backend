import Category from "../../models/categoryModel.js";


     async function createCategory(name, description) {
        try {
            return await Category.create({ name, description });
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async function getAllCategories() {
        try {
            return await Category.find();
        } catch (error) {
            throw new Error("Error al obtener las categorías");
        }
    }

    async function getCategory(id) {
        try {
            return await Category.findById(id);
        } catch (error) {
            throw new Error("Error al obtener la categoría");
        }
    }

    async function updateCategory(id, name, description) {
        try {
            return await Category.findByIdAndUpdate(
                id, 
                { name, description },
                { new: true }
            );
        } catch (error) {
            throw new Error("Error al actualizar la categoría");
        }
    }

    async function deleteCategory(id) {
        try {
            return await Category.findByIdAndDelete(id);
        } catch (error) {
            throw new Error("Error al eliminar la categoría");
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