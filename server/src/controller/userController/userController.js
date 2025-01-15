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
        if (!country) {
            throw new userError.MISSING_PARAMETERS();
        }
        const users = await User.find({
            country: { $regex: new RegExp(`^${country}$`, 'i') }
        });
        if (!users || !users.length) {
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
        if (!city) {
            throw new userError.MISSING_PARAMETERS();
        }

        const users = await User.find({
            city: { $regex: new RegExp(`^${city}$`, 'i') }
        });
        if (!users || !users.length) {
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
        // 1. Validate required fields
        if (!userData.username || !userData.email || !userData.password) {
            throw new userError.MISSING_PARAMETERS();
        }

        // 2. Check if user exists
        const existingUser = await checkExistingUser(userData.email, userData.username);
        if (existingUser) {
            throw new userError.USER_INVALID_DATA();
        }

        // 3. Create user with defaults for optional fields
        const userToCreate = {
            username: userData.username,
            email: userData.email,
            password: userData.password,
            name: userData.name || '',
            lastname: userData.lastname || '',
            social_media: userData.social_media || [],
            description: userData.description || '',
            role: 'user',
            privacy: true,
            country: userData.country || '',
            city: userData.city || '',
            isActivated: true,
            createdAt: new Date()
        };

        const user = new User(userToCreate);
        await user.save();
        return user;

    } catch(error) {
        console.error('Create user error:', error);
        throw new userError.USER_CREATE_ERROR();
    }
}

async function updateUser(id, userData) {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: userData },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            throw new userError.USER_NOT_FOUND();
        }
        return updatedUser;
    } catch (error) {
        throw new userError.USER_UPDATE_ERROR();
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
async function checkExistingUser(email, username) {
    // Assuming you're using a database model like User
    const user = await User.findOne({
        $or: [
            { email: email },
            { username: username }
        ]
    });
    return user;
}

export const functions = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUsersByCountry,
    getUsersByCity,
    createUser,
    updateUser,
    deleteUser,
    checkExistingUser
};

export default functions;