// controllers/oauthController/oauthApiController.js - ARCHIVO NUEVO
import oauthController from "./oAuthController.js";
import jwt from "../../config/jwt.js";

class OAuthApiController {
    // Manejar callback exitoso de Google
    async handleGoogleCallback(req, res) {
        try {
            const user = await oauthController.handleOAuthCallback(req.user);
            
            const token = jwt.sign({ 
                id: user._id, 
                email: user.email, 
                role: user.role 
            });
            
            res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}&userId=${user._id}`);
        } catch (error) {
            console.error('Error en callback de Google:', error);
            res.redirect(`${process.env.FRONTEND_URL}/auth/error?message=authentication_failed`);
        }
    }

    // Manejar callback exitoso de GitHub
    async handleGitHubCallback(req, res) {
        try {
            const user = await oauthController.handleOAuthCallback(req.user);
            
            const token = jwt.sign({ 
                id: user._id, 
                email: user.email, 
                role: user.role 
            });
            
            res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}&userId=${user._id}`);
        } catch (error) {
            console.error('Error en callback de GitHub:', error);
            res.redirect(`${process.env.FRONTEND_URL}/auth/error?message=authentication_failed`);
        }
    }

    // Obtener proveedores del usuario actual
    async getUserProviders(req, res) {
        try {
            const providers = await oauthController.getUserProviders(req.user._id);
            res.json(providers);
        } catch (error) {
            console.error('Error obteniendo proveedores:', error);
            const status = error.status || 500;
            res.status(status).json({ message: error.message });
        }
    }

    // Manejar callback de vinculación de Google
    async handleGoogleLinkCallback(req, res) {
        try {
            const userId = req.query.state;
            
            if (!userId) {
                return res.redirect(`${process.env.FRONTEND_URL}/profile/settings?error=missing_user_id`);
            }

            await oauthController.processLinkCallback(req.user, userId, 'google');
            
            res.redirect(`${process.env.FRONTEND_URL}/profile/settings?success=google_linked`);
        } catch (error) {
            console.error('Error vinculando Google:', error);
            res.redirect(`${process.env.FRONTEND_URL}/profile/settings?error=link_failed`);
        }
    }

    // Manejar callback de vinculación de GitHub
    async handleGitHubLinkCallback(req, res) {
        try {
            const userId = req.query.state;
            
            if (!userId) {
                return res.redirect(`${process.env.FRONTEND_URL}/profile/settings?error=missing_user_id`);
            }

            await oauthController.processLinkCallback(req.user, userId, 'github');
            
            res.redirect(`${process.env.FRONTEND_URL}/profile/settings?success=github_linked`);
        } catch (error) {
            console.error('Error vinculando GitHub:', error);
            res.redirect(`${process.env.FRONTEND_URL}/profile/settings?error=link_failed`);
        }
    }

    // Desvincular proveedor
    async unlinkProvider(req, res) {
        try {
            const { provider } = req.params;
            
            oauthController.validateProvider(provider);
            
            const user = await oauthController.unlinkProvider(req.user._id, provider);
            res.json({ 
                message: `${provider} unlinked successfully`, 
                user: {
                    id: user._id,
                    email: user.email,
                    providers: user.authProviders
                }
            });
        } catch (error) {
            console.error('Error desvinculando proveedor:', error);
            const status = error.status || 500;
            res.status(status).json({ message: error.message });
        }
    }

    // Preparar vinculación de Google
    prepareGoogleLink(req, res, next) {
        // El state se manejará en la URL de Passport
        next();
    }

    // Preparar vinculación de GitHub
    prepareGitHubLink(req, res) {
        // Redirigir con state parameter
        const authURL = `/auth/link/github/redirect?state=${req.user._id}`;
        res.redirect(authURL);
    }
}

export default new OAuthApiController();