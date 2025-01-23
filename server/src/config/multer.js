
import multer from 'multer';
import path from 'path';
import fs from 'fs';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'avatar') {
            const dir = 'database/archives/avatars';
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            return cb(null, dir);
        }else {
            const projectId = req.body.projectId;
            const dir = `database/archives/projects/${projectId}`;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            cb(null, dir);
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = file.mimetype.split('/')[1];
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext);
    }
});


const fileFilter = (req, file, cb) => {

    if (file.fieldname === 'images') {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only jpg, jpeg, png and gif files are allowed'), false);
        }
    } else {

        cb(null, true);
    }
};


const limits = {
    files: 4,
    fileSize: 5 * 1024 * 1024
};


const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
}).fields([
    { name: 'images', maxCount: 4 },
    { name: 'name', maxCount: 1 },
    { name: 'description', maxCount: 1 },
    { name: 'status', maxCount: 1 },
    { name: 'url', maxCount: 1 },
    { name: 'owner', maxCount: 1 },
    { name: 'team_members', maxCount: 1 },
    { name: 'styles', maxCount: 1 },
    { name: 'subjects', maxCount: 1 },
    { name: 'types', maxCount: 1 },
    { name: 'projectId', maxCount: 1 }
]);

export const uploadAvatar = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
}).single('avatar');

export default upload;