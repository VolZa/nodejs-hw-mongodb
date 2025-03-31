import multer from 'multer';
import path from 'node:path';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('src', 'tmp'));
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = file.originalname.split('.')[0];
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, name + '-' + uniqueSuffix + ext);
  },
});

export const upload = multer({ storage: storage });
