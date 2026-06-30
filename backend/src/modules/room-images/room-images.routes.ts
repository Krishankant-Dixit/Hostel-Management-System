import { Router } from 'express';
import { authenticate, authorize } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import { uploadRoomImage } from '../../utils/upload';
import { roomIdParamSchema, imageIdSchema, updateImageSchema } from './room-images.validation';
import { listImages, uploadImage, updateImage, deleteImage } from './room-images.controller';

const router = Router({ mergeParams: true });

router.get('/', authenticate, validate(roomIdParamSchema), listImages);
router.post(
  '/',
  authenticate,
  authorize('admin'),
  validate(roomIdParamSchema),
  uploadRoomImage.single('image'),
  uploadImage
);
router.patch('/:imageId', authenticate, authorize('admin'), validate(updateImageSchema), updateImage);
router.delete('/:imageId', authenticate, authorize('admin'), validate(imageIdSchema), deleteImage);

export default router;
