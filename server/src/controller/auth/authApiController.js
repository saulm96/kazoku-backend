import authController from "./authController.js"
import jwt from "../../config/jwt.js";

import error from "../../helpers/errors/userError.js"

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await authController.login(email, password);

        if (!user) {
            throw new error.USER_NOT_FOUND();
        }
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role });
        console.log(token)
        res.json({ token, userId: user._id });
    } catch (error) {
        console.error(error);
        error.status ? res.status(error.status) : res.status(500);

        res.json({ message: error.message });
    }
}

async function register(req, res) {
    try {
        const { email, username, password, confirmedPassword } = req.body;
        const newUser = await authController.register(email, username, password, confirmedPassword);

        res.json(newUser);
    } catch (error) {
        console.error(error);
        error.status ? res.status(error.status) : res.status(500);

        res.json({ message: error.message });
    }
}

export default {
    login,
    register
}