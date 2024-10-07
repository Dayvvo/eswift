import multer from 'multer';
import path from 'path';
// multer config
const multerConfig = multer({
    limits: { fileSize: 2 * 1024 * 1024 }, //2MB
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            cb(null, false);
            return;
        }
        cb(null, true);
    },
});
export default multerConfig;
