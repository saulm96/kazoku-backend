import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

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
    social_media: [{
        type: String,
        validate: {
            validator: function (v) {
                return /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+)\.([a-zA-Z0-9]{2,})$/.test(v);
            },
            message: props => `${props.value} is not a valid URL`
        }
    }],
    description: {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    privacy: {
        type: Boolean,
        default: false,
    },
    country:{
        type: String,
    },
    city:{
        type: String,
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