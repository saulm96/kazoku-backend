import User from "../../models/userModel.js";
import error from "../../helpers/errors/userError.js"

class OAuthController {
    async handleOAuthCallback(user){
        try {
            if(!user){
                throw new error.USER_NOT_FOUND();
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    async linkProvider (userId, provider, providerId, providerEmail){
        
    }
}