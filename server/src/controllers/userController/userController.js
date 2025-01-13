//Login registro Lista..  modificar perfil..  desactivar perfil+
//Buscar por pais, por ciudad

import User from "../../models/userModel.js"
import error from "../../helpers/errors/userErrors.js"

async function getAllUsers() {
    const users = await User.find();
    if (!users) {
        throw new error.USER_NOT_FOUND();
    }
    return users;
}

async function getUserById(id) {
    const user = await User.findById(id);
    if (!user) {
        throw new error.USER_NOT_FOUND();
    }
    return user;
}

async function getUserByEmail(email) {
    const user = await User.findOne({ email });

    if (!user) throw new error.USER_NOT_FOUND();
    return user;
}

async function createUser(name, lastname, username, email, password, telephone, social_media, description, role, privacy, country, city) {
    if (!name || !lastname || !username || !email || !password || !telephone || !social_media || !description || !role || !privacy || !country || !city) {
        throw new error.MISSING_PARAMETERS();
    }
    const oldUser = await getUserByEmail(email);
    if (oldUser) throw new error.EMAIL_ALREADY_EXISTS();
    const newUser = await User.create({
        name,
        lastname,
        username,
        email,
        password,
        telephone,
        social_media,
        description,
        role,
        privacy,
        country,
        city
    });
    await newUser.save();
    return newUser;
}

async function updateUser(id, name, lastname, username, email, password, telephone, social_media, description, role, privacy, country, city) {
}