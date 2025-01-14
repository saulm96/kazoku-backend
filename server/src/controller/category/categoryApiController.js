import categoryController from "./categoryController.js";


    async function createCategory(req, res) {
        try {
            const { name, description } = req.body;
            const category = await categoryController.createCategory(name, description);
            res.status(201).json(category);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    }

    async function getAllCategories(req, res) {
        try {
            const categories = await categoryController.getAllCategories();
            res.status(200).json(categories);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server not found" });
        }
    }

    async function getCategory(req, res) {
        try {
            const category = await categoryController.getCategory(req.params.id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json(category);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server not found" });
        }
    }

    async function updateCategory(req, res) {
        try {
            const { name, description } = req.body;
            const category = await categoryController.updateCategory(
                req.params.id,
                name,
                description
            );
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json(category);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server not found" });
        }
    }

    async function deleteCategory(req, res) {
        try {
            const category = await categoryController.deleteCategory(req.params.id);
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json({ message: "Category successfully deleted" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Server not found" });
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