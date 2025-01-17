// middleware/authMiddleware.js
import jwt from '../config/jwt.js';

async function isAuthenticated(req, res, next) {
    try {
        console.log('=== Authentication Start ===');
        const authorization = req.headers.authorization;
        
        if (!authorization) {
            console.log('No authorization header');
            return res.status(401).json({ message: "Token is required" });
        }

        if (!authorization.startsWith('Bearer ')) {
            console.log('Invalid token format');
            return res.status(401).json({ message: "Invalid token format" });
        }

        const token = authorization.split(' ')[1];
        console.log('Token:', token);
        
        const verified = jwt.verify(token);
        console.log('Verified token:', verified);

        if (verified.error) {
            console.log('Token verification error:', verified.error);
            return res.status(401).json({ message: "Invalid token" });
        }

        // Agregar usuario a req
        req.user = {
            _id: verified.id,
            email: verified.email,
            role: verified.role
        };

        console.log('User set in middleware:', req.user);
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ message: "Authentication failed" });
    }
}

async function isAdmin(req, res, next) {
    try {
        const authorization = req.headers.authorization;
        
        if (!authorization) {
            return res.status(401).json({ message: "Token is required" });
        }

        if (!authorization.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Invalid token format" });
        }

        const token = authorization.split(' ')[1];
        const verified = jwt.verify(token);

        if (verified.error) {
            return res.status(401).json({ message: "Invalid token" });
        }

        if (verified.role !== 'admin') {
            return res.status(401).json({ message: "Admin access required" });
        }

        req.user = {
            _id: verified.id,
            email: verified.email,
            role: verified.role
        };

        next();
    } catch (error) {
        console.error('Admin authentication error:', error);
        return res.status(401).json({ message: "Authentication failed" });
    }
}

async function isAdminOrSelfUser(req, res, next) {
    try {
        const authorization = req.headers.authorization;
        
        if (!authorization) {
            return res.status(401).json({ message: "Token is required" });
        }

        if (!authorization.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Invalid token format" });
        }

        const token = authorization.split(' ')[1];
        const verified = jwt.verify(token);

        if (verified.error) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const paramId = req.params.id;
        if (verified.role !== 'admin' && verified.id !== paramId) {
            return res.status(401).json({ message: "Unauthorized access" });
        }

        req.user = {
            _id: verified.id,
            email: verified.email,
            role: verified.role
        };

        next();
    } catch (error) {
        console.error('Authorization error:', error);
        return res.status(401).json({ message: "Authentication failed" });
    }
}

export { isAuthenticated, isAdmin, isAdminOrSelfUser };