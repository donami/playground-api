import express from 'express';

import playgroundRoutes from './playground.route';
import equipmentRoutes from './equipment.route';
import commentRoutes from './comment.route';
import imageUploadRoutes from './image-upload.route';

const router = express.Router();

router.use('/playground', playgroundRoutes);
router.use('/equipment', equipmentRoutes);
router.use('/comment', commentRoutes);
router.use('/image-upload', imageUploadRoutes);

export default router;
