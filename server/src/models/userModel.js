import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const urlValidator = {
    validator: function (v) {
        if(v === "") return true;
        
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
        // ⚠️ CAMBIO: Ya no es requerido porque usuarios OAuth pueden no tenerlo
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
        validate: urlValidator,
    }],
    instagram: {
        type: String,
        validate: urlValidator
    },
    linkedin: {
        type: String,
        validate: urlValidator
    },
    github: {
        type: String,
        validate: urlValidator
    },
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
    projectlike: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/dv7hswrot/image/upload/v1620714814/avatars/default_avatar.png',
    },  
    isActivated: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    
    // ✅ NUEVOS CAMPOS PARA OAuth
    authProviders: [{
        provider: {
            type: String,
            enum: ['local', 'google', 'github'],
            required: true
        },
        providerId: {
            type: String,
            required: true
        },
        providerEmail: {
            type: String, // Para casos donde el email del proveedor difiere del principal
        },
        connectedAt: {
            type: Date,
            default: Date.now
        }
    }],
    
    // Metadatos de registro inicial
    registrationMethod: {
        type: String,
        enum: ['local', 'google', 'github'],
        required: true,
        default: 'local'
    },
    
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.pre('save', async function (next) {
    if (!this.password || !this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.matchPassword = async function (password) {
    if (!this.password) return false;
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.hasProvider = function(provider) {
    return this.authProviders.some(p => p.provider === provider);
};

userSchema.methods.addProvider = function(provider, providerId, providerEmail) {
    if (!this.hasProvider(provider)) {
        this.authProviders.push({
            provider,
            providerId,
            providerEmail: providerEmail || this.email
        });
    }
};

userSchema.methods.getProvider = function(provider) {
    return this.authProviders.find(p => p.provider === provider);
};

const User = mongoose.model('User', userSchema);

export default User;