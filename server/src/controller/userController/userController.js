import User from "../../models/userModel.js";
import userError from "../../helpers/errors/userError.js";

async function getAllUsers() {
    try {
        const users = await User.find();
        if (!users.length) {
            throw new userError.USER_NOT_FOUND();
        }
        return users;
    } catch (error) {
        if (error.name === 'USER_NOT_FOUND') {
            throw error;
        }
        throw new userError.USER_LIST_ERROR();
    }
}

async function getUserById(id) {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new userError.USER_NOT_FOUND();
        }
        return user;
    } catch (error) {
        if (error.name === 'USER_NOT_FOUND') {
            throw error;
        }
        throw new userError.USER_NOT_FOUND();
    }
}

async function getUserByEmail(email) {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new userError.USER_NOT_FOUND();
        }
        return user;
    } catch (error) {
        if (error.name === 'USER_NOT_FOUND') {
            throw error;
        }
        throw new userError.USER_NOT_FOUND();
    }
}

async function getUsersByCountry(country) {
    try {
        const users = await User.find({ country });
        if (!users.length) {
            throw new userError.MISSING_USERS_IN_COUNTRY();
        }
        return users;
    } catch (error) {
        if (error.name === 'MISSING_USERS_IN_COUNTRY') {
            throw error;
        }
        throw new userError.USER_LIST_ERROR();
    }
}

async function getUsersByCity(city) {
    try {
        const users = await User.find({ city });
        if (!users.length) {
            throw new userError.MISSING_USERS_IN_CITY();
        }
        return users;
    } catch (error) {
        if (error.name === 'MISSING_USERS_IN_CITY') {
            throw error;
        }
        throw new userError.USER_LIST_ERROR();
    }
}

async function createUser(userData) {
    try {
        
        const { username, email, password } = userData;

        const requiredFields = [
            { field: 'username', value: username },
            { field: 'email', value: email },
            { field: 'password', value: password }
        ];

        const missingFields = requiredFields
            .filter(field => !field.value)
            .map(field => field.field);

        if (missingFields.length > 0) {
            throw new userError.MISSING_PARAMETERS(
                `Missing required fields: ${missingFields.join(', ')}`
            );
        }

        
        if (userData.social_media && !Array.isArray(userData.social_media)) {
            userData.social_media = [userData.social_media];
        }

        
        const existingUser = await User.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });

        if (existingUser) {
            if (existingUser.email === email) {
                throw new userError.EMAIL_ALREADY_EXISTS();
            }
            throw new userError.USER_INVALID_DATA('Username already exists');
        }

        
        const user = await User.create(userData);
        return user;

    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new userError.USER_INVALID_DATA(error.message);
        }
        throw error;
    }
}

async function updateUser(id, userData) {
    try {
        
        if (userData.email || userData.username) {
            const existingUser = await User.findOne({
                _id: { $ne: id },
                $or: [
                    { email: userData.email },
                    { username: userData.username }
                ]
            });

            if (existingUser) {
                if (existingUser.email === userData.email) {
                    throw new userError.EMAIL_ALREADY_EXISTS();
                }
                throw new userError.USER_INVALID_DATA('Username already exists');
            }
        }

        
        if (userData.social_media && !Array.isArray(userData.social_media)) {
            userData.social_media = [userData.social_media];
        }

        const updatedUser = await User.findByIdAndUpdate(
            id,
            userData,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            throw new userError.USER_NOT_FOUND();
        }

        return updatedUser;
    } catch (error) {
        if (error.name === 'ValidationError') {
            throw new userError.USER_INVALID_DATA(error.message);
        }
        throw error;
    }
}

async function deleteUser(id) {
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            throw new userError.USER_NOT_FOUND();
        }
        return user;
    } catch (error) {
        if (error.name === 'USER_NOT_FOUND') {
            throw error;
        }
        throw new userError.USER_DELETE_ERROR();
    }
}

export const functions = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUsersByCountry,
    getUsersByCity,
    createUser,
    updateUser,
    deleteUser
};

export default functions;