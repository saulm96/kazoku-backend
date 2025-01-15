import jwt from '../config/jwt.js';
import userController from "../controller/userController/userController.js"

async function isAuthenticated(req, res, next){
    const authorization = req.headers.authorization;
    if(!authorization){
        return res.status(401).json({message: "Token is required"});
    }

    const token = authorization.replace("Bearer ", "");
    const verified = jwt.verify(token);

    if(verified.error) return res.status(401),json({message: "Invcorrect jwt token provided!"});

    next();
}

async function isAdmin(req, res, next){
    const authorization = req.headers.authorization;
    if(!authorization){
        return res.status(401).json({message: "Token is required"});
    }

    const token = authorization.replace("Bearer ", "");
    const verified = jwt.verify(token);

    if(verified.error) return res.status(401),json({message: "Invcorrect jwt token provided!"});ç

    if(verified.role !== 'admin' || !verified.role) return res.status(401).json({message: "Unauthorized access"});

    next();

}

export { isAuthenticated, isAdmin };