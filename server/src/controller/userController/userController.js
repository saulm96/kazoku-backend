import User from "../../models/userModel.js";
import Image from "../../models/imageModel.js";
import Project from "../../models/projectModel.js";
import userError from "../../helpers/errors/userError.js";

async function getAllUsers() {
    try {
        const users = await User.find()
            .populate({
                path: 'projectlike',
                select: 'owner date url images likes, ',
                model: Project,
                populate: [{
                    path: 'owner',
                    select: '_id name lastname username',
                    model: User
                }, {
                    path: 'images',
                    select: 'url',
                    model: Image
                }]

            })
            .populate({
                path: 'following',
                select: ' _id username specialization avatar',
                model: User
            })
            .populate({
                path: 'followers',
                select: '_id username specialization avatar',
                model: User
            });
        if (!users || !users.length) {
            throw new userError.USER_LIST_ERROR();
        }
        return users;
    } catch (error) {
        throw new userError.USER_LIST_ERROR();
    }
}
async function getUserBySpecialization(specializations) {
    const specializationArray = specializations.split(',').map(s => s.trim());


    const users = await User.find({
        specialization: { $in: specializationArray }
    })

    if (!users || !users.length) {
        throw new userError.USER_NOT_FOUND();
    }

    return users;

}

async function getUserByUsername(username) {
    try {
        const user = await User.findOne({ username: username })
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

async function getUserById(id) {
    try {
        const user = await User.findById(id)
            .populate({
                path: 'projectlike',
                select: 'owner date url images likes, ',
                model: Project,
                populate: [{
                    path: 'owner',
                    select: '_id name lastname username',
                    model: User
                }, {
                    path: 'images',
                    select: 'url',
                    model: Image
                }]

            })
            .populate({
                path: 'following',
                select: ' _id username specialization',
                model: User
            })
            .populate({
                path: 'followers',
                select: '_id username specialization',
                model: User
            });
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
        const countryArray = country.split(',').map(c => c.trim());
        const regexPatterns = countryArray.map(c => new RegExp(`^${c}$`, 'i'));

        const users = await User.find({
            country: { $in: regexPatterns }

        })
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
        const cityArray = city.split(',').map(c => c.trim());
        const regexPatterns = cityArray.map(c => new RegExp(`^${c}$`, 'i'));

        const users = await User.find({
            city: { $in: regexPatterns }
        })

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
            name: userData.name || '',
            lastname: userData.lastname || '',
            username: userData.username,
            email: userData.email,
            password: userData.password,
            telephone: userData.telephone || '',
            specialization: userData.specialization || 'None',
            website: userData.website || [],
            github: userData.github,
            linkedin: userData.linkedin,
            instagram: userData.instagram,
            description: userData.description || '',
            privacy: true,
            country: userData.country || '',
            city: userData.city || '',
            following: [],
            followers: [],
            projectlike: [],
            avatar: userData.avatar || '',
            isActivated: true,
            role: 'user',
            createdAt: new Date()
        };

        const user = new User(userToCreate);
        await user.save();
        return user;

    } catch (error) {
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

async function followUnfollowSystem(mainUserId, userId) {
    try {
        const mainUser = await User.findById(mainUserId);
        const user = await User.findById(userId);

        if (!mainUser || !user) {
            throw new userError.USER_NOT_FOUND();
        }

        // Convert IDs to strings for comparison
        const userIdStr = userId.toString();
        const mainUserIdStr = mainUserId.toString();

        if (mainUser.following.map(id => id.toString()).includes(userIdStr)) {
            // Unfollow
            mainUser.following = mainUser.following.filter(id => id.toString() !== userIdStr);
            user.followers = user.followers.filter(id => id.toString() !== mainUserIdStr);
        } else {
            // Follow
            mainUser.following.push(userId);
            user.followers.push(mainUserId);
        }

        await mainUser.save();
        await user.save();

        return { mainUser, user };
    }
    catch (error) {
        throw new userError.USER_FOLLOW_ERROR();
    }
}
async function likeProject(userId, projectId) {
    try {
        const user = await User.findById(userId);
        const project = await Project.findById(projectId);

        if (!user || !project) {
            throw new userError.USER_NOT_FOUND();
        }

        // Convert IDs to strings for comparison
        const projectIdStr = projectId.toString();

        if (user.projectlike.map(id => id.toString()).includes(projectIdStr)) {
            // Unlike project
            user.projectlike = user.projectlike.filter(id => id.toString() !== projectIdStr);
            project.likes--;
        } else {
            // Like project
            user.projectlike.push(projectId);
            project.likes++;
        }

        await user.save();
        await project.save();

        return { user, project };
    }
    catch (error) {
        throw new userError.USER_LIKE_ERROR();
    }
}
export const functions = {
    getAllUsers,
    getUserByUsername,
    getUserBySpecialization,
    getUserById,
    getUserByEmail,
    getUsersByCountry,
    getUsersByCity,
    createUser,
    updateUser,
    deleteUser,
    checkExistingUser,
    followUnfollowSystem,
    likeProject,
};

export default functions;