import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { AppError } from '../../utils/AppError';
import { param } from '../../utils/param';
import { roomImagesService } from './room-images.service';

export const listImages = asyncHandler(async (req: Request, res: Response) => {
  const data = await roomImagesService.list(param(req.params.id));
  res.json({ success: true, data });
});

export const uploadImage = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) throw new AppError('Image file is required', 400);
  const data = await roomImagesService.upload(param(req.params.id), req.file, req.body.caption);
  res.status(201).json({ success: true, data });
});

export const updateImage = asyncHandler(async (req: Request, res: Response) => {
  const data = await roomImagesService.update(
    param(req.params.id),
    param(req.params.imageId),
    req.body
  );
  res.json({ success: true, data });
});

export const deleteImage = asyncHandler(async (req: Request, res: Response) => {
  const data = await roomImagesService.remove(param(req.params.id), param(req.params.imageId));
  res.json({ success: true, data });
});
