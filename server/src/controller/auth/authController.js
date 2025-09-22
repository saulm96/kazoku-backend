// controllers/authController/authController.js - MODIFICAR ARCHIVO EXISTENTE
import userController from "../userController/userController.js"
import { verifyPassword } from "../../config/bcrypt.js"
import error from "../../helpers/errors/userError.js"

async function login(email, password) {
    const user = await userController.getUserByEmail(email);

    if (!user) throw new error.EMAIL_DOES_NOT_EXIST();

    if (!user.hasProvider('local')) {
        throw new error.LOCAL_AUTH_NOT_CONFIGURED();
    }

    const validPassword = await verifyPassword(password, user.password);
    if (!validPassword) throw new error.INCORRECT_PASSWORD();

    return user;
}

async function register(email, username, password, confirmedPassword) {
    if (password !== confirmedPassword) throw new error.PASSWORD_DOES_NOT_MATCH();
    
    const existingUser = await userController.checkExistingUser(email, username);
    if (existingUser) throw new error.EMAIL_ALREADY_EXISTS();
    
    const data = { 
        email, 
        username, 
        password,
        registrationMethod: 'local',
        authProviders: [{
            provider: 'local',
            providerId: email, // Usamos email como ID para local
            providerEmail: email
        }]
    };
    
    const newUser = await userController.createUser(data);
    return newUser;
}

export default {
    register,
    login
}