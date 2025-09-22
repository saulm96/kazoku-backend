// routes/authRoutes.js - MODIFICAR TU ARCHIVO EXISTENTE
import express from 'express';
import passport from '../config/passport.js'; 
import oauthApiController from '../controllers/oauthController/oauthApiController.js'; 
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();




// Google OAuth - Iniciar autenticación
router.get('/google', 
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth - Callback
router.get('/google/callback', 
    passport.authenticate('google', { session: false }),
    oauthApiController.handleGoogleCallback
);

// GitHub OAuth - Iniciar autenticación
router.get('/github',
    passport.authenticate('github', { scope: ['user:email'] })
);

// GitHub OAuth - Callback
router.get('/github/callback',
    passport.authenticate('github', { session: false }),
    oauthApiController.handleGitHubCallback
);

// === ⚠️ NUEVAS RUTAS PARA GESTIÓN DE PROVEEDORES ===

// Obtener proveedores vinculados del usuario actual
router.get('/providers', isAuthenticated, oauthApiController.getUserProviders);

// Vincular Google a cuenta existente
router.get('/link/google', 
    isAuthenticated, 
    oauthApiController.prepareGoogleLink,
    passport.authenticate('google', { 
        scope: ['profile', 'email'],
        state: true // Passport manejará el state automáticamente
    })
);

// Callback para vincular Google
router.get('/link/google/callback',
    passport.authenticate('google', { session: false }),
    oauthApiController.handleGoogleLinkCallback
);

// Vincular GitHub a cuenta existente  
router.get('/link/github', 
    isAuthenticated, 
    oauthApiController.prepareGitHubLink
);

// Ruta intermedia para GitHub con state
router.get('/link/github/redirect', 
    passport.authenticate('github', { scope: ['user:email'] })
);

// Callback para vincular GitHub
router.get('/link/github/callback',
    passport.authenticate('github', { session: false }),
    oauthApiController.handleGitHubLinkCallback
);

// Desvincular proveedor
router.delete('/unlink/:provider', 
    isAuthenticated, 
    oauthApiController.unlinkProvider
);

export default router;