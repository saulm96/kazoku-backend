import User from "../../models/userModel.js";
import error from "../../helpers/errors/userError.js";

class OAuthController {
  //Handle OAuth callback
  async handleOAuthCallback(user) {
    try {
      if (!user) {
        throw new error.USER_NOT_FOUND();
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
  //Link oAuth provider to existing account
  async linkProvider(userId, provider, providerId, providerEmail) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new error.USER_NOT_FOUND();
      }
      if (user.hasProvider(provider)) throw new errorPROVIDER_ALREADY_LINKED();
      const existingUser = await User.findOne({
        "authProviders.provider": provider,
        "authProviders.providerId": providerId,
      });
      if (existingUser && existingUser._id.toString() !== userId) {
        throw new error.PROVIDER_LINKED_TO_ANOTHER_ACCOUNT();
      }

      user.addProvider(provider, providerId, providerEmail);
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }

  async unlinkProvider(userId, provider) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new error.USER_NOT_FOUND();
      }
      if (user.authProviders.length <= 1) {
        throw new error.CANNOT_UNLINK_LAST_PROVIDER();
      }
      if (provider === "local" && !user.password) {
        throw new error.CANNOT_UNLINK_WITHOUT_PASSWORD();
      }
      user.authProviders = user.authProviders.filter(
        (p) => p.provider !== provider
      );
      await user.save();
      return user;
    } catch (error) {
      throw error;
    }
  }
  //Get linked providers for a user
  async getUserProviders(userId) {
    try {
      const user = await User.findById(userId).select("authProviders email");
      if (!user) throw new error.USER_NOT_FOUND();

      return {
        email: user.email,
        providers: user.authProviders.map((p) => ({
          provider: p.provider,
          connectedAt: p.connectedAt,
          providerEmail: p.providerEmail,
        })),
      };
    } catch (err) {
      throw err;
    }
  }

  //Process links from callback
  async processLinkCallback(oauthUser, userId, provider){
    try {
        if(!oauthUser) throw new error.OAUTH_CALLBACK_ERROR();

        const providerData = oauthUser.getProvider(provider);
        if(!providerData) throw new error.OAUTH_PROVIDER_DATA_NOT_FOUND();

        await this.linkProvider(
            userId,
            provider,
            providerData.providerId,
            providerData.providerEmail
        );
        return {
            success: true, 
            message: `${provider} account linked successfully.`
        };
    }catch (error) {
        throw error;
    }
  }
  //Validate provider
    validateProvider(provider) {
        const validProviders = ['google', 'github', 'local'];
        if(!validProviders.includes(provider)){
            throw new error.INVALID_PROVIDER();
        }
        return true;
    }
}

export default new OAuthController();

