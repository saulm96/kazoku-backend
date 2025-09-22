import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../models/userModel.js';


//Google oauth config
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails[0].value;
        const googleId = profile.id;
        
        // Search for user by email
        let user = await User.findOne({ email });
        
        if (user) {
            // User exists - link Google if not already linked
            if (!user.hasProvider('google')) {
                user.addProvider('google', googleId, email);
                await user.save();
            }
            return done(null, user);
        } else {
            // User does not exist - create new user
            const newUser = new User({
                email,
                username: profile.displayName || profile.emails[0].value.split('@')[0],
                name: profile.name?.givenName || '',
                lastname: profile.name?.familyName || '',
                avatar: profile.photos[0]?.value || undefined,
                registrationMethod: 'google',
                authProviders: [{
                    provider: 'google',
                    providerId: googleId,
                    providerEmail: email
                }]
            });
            
            await newUser.save();
            return done(null, newUser);
        }
    } catch (error) {
        console.error('Error en Google Strategy:', error);
        return done(error, null);
    }
}));

// GitHub OAuth config
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails[0]?.value;
        const githubId = profile.id;
        
        if (!email) {
            return done(new Error('No email found in GitHub profile'), null);
        }

        // Search for user by email
        let user = await User.findOne({ email });
        
        if (user) {
            // User exists - link GitHub if not already linked
            if (!user.hasProvider('github')) {
                user.addProvider('github', githubId, email);
                // Update GitHub URL if not present
                if (!user.github && profile.profileUrl) {
                    user.github = profile.profileUrl;
                }
                await user.save();
            }
            return done(null, user);
        } else {
            // User does not exist - create new user
            const newUser = new User({
                email,
                username: profile.username || profile.displayName || email.split('@')[0],
                name: profile.displayName || '',
                avatar: profile.photos[0]?.value || undefined,
                github: profile.profileUrl || '',
                registrationMethod: 'github',
                authProviders: [{
                    provider: 'github',
                    providerId: githubId,
                    providerEmail: email
                }]
            });
            
            await newUser.save();
            return done(null, newUser);
        }
    } catch (error) {
        console.error('Error en GitHub Strategy:', error);
        return done(error, null);
    }
}));

export default passport;