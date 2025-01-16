import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const urlValidator = {
    validator: function (v) {
        return /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-\.\/]*)*\/?$/.test(v);
    },
    message: props => `${props.value} is not a valid URL`
};

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    lastname: {
        type: String,
    },
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    telephone: {
        type: String,
    },
    specialization: {
        type: String,
        enum: ["Frontend", "Backend", "Fullstack", "UX/UI", "Other", "None"],
        default: "None",
    },
    website: [{
        type: String,
        validate: urlValidator
    }],
    instagram: [{
        type: String,
        validate: urlValidator
    }],
    linkedin: [{
        type: String,
        validate: urlValidator
    }],
    github: [{
        type: String,
        validate: urlValidator
    }],
    description: {
        type: String,
    },
    privacy: {
        type: Boolean,
        default: false,
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    isActivated: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

export default User;