import jwt from '../config/jwt.js';

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

    if(verified.error) return res.status(401),json({message: "Invcorrect jwt token provided!"});

    if(verified.role !== 'admin' || !verified.role) return res.status(401).json({message: "Unauthorized access"});

    next();

}

async function isAdminOrSelfUser(req, res, next){
    const authorization = req.headers.authorization;
    if(!authorization){
        return res.status(401).json({message: "Token is required"});
    }

    const token = authorization.replace("Bearer ", "");
    const verified = jwt.verify(token);

    if(verified.error) return res.status(401),json({message: "Invcorrect jwt token provided!"});
    
    const id = parseInt(req.params.id);
    if((!verified.role || verified.role !== 'admin') && id != verified._id){
        console.log(verified._id);
        return res.status(401).json({message: "Unauthorized access"});
    }

    next();

}

export { isAuthenticated, isAdmin, isAdminOrSelfUser };