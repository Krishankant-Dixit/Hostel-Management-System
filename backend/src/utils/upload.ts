import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { env } from '../config/env';
import { AppError } from './AppError';

const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

ensureDir(path.join(env.UPLOAD_DIR, 'rooms'));
ensureDir(path.join(env.UPLOAD_DIR, 'issues'));

const storage = (subdir: string) =>
  multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, path.join(env.UPLOAD_DIR, subdir));
    },
    filename: (_req, file, cb) => {
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${unique}${path.extname(file.originalname)}`);
    },
  });

const imageFilter: multer.Options['fileFilter'] = (_req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowed.includes(file.mimetype)) {
    cb(new AppError('Only JPEG, PNG, and WebP images are allowed', 400));
    return;
  }
  cb(null, true);
};

export const uploadRoomImage = multer({
  storage: storage('rooms'),
  limits: { fileSize: env.MAX_FILE_SIZE },
  fileFilter: imageFilter,
});

export const uploadIssueAttachment = multer({
  storage: storage('issues'),
  limits: { fileSize: env.MAX_FILE_SIZE },
  fileFilter: imageFilter,
});
