import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();

const STATIC_URL = 'http://localhost:9001/static/';

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './public'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const fileIsAllowed = allowedExtensions.indexOf(ext) > -1; // eslint-disable-line no-unused-vars

    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
});

router.post('/upload', upload.single('file'), (req, res, next) => {
  // Metadata about the uploaded file can now be found in req.file
  const data = {
    filename: req.file.filename,
    path: `${STATIC_URL}${req.file.filename}`,
  };

  res.status(200).send({ message: 'Upload complete', data });
});

export default router;
