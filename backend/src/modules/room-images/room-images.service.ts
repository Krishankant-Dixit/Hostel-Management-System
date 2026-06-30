import { Types } from 'mongoose';
import { AppError } from '../../utils/AppError';
import { Room, RoomImage } from '../../models';

export const roomImagesService = {
  async list(roomId: string) {
    if (!Types.ObjectId.isValid(roomId)) throw new AppError('Invalid room id', 400);
    return RoomImage.find({ roomId }).sort({ sortOrder: 1 });
  },

  async upload(roomId: string, file: Express.Multer.File, caption?: string) {
    if (!Types.ObjectId.isValid(roomId)) throw new AppError('Invalid room id', 400);
    const room = await Room.findById(roomId);
    if (!room) throw new AppError('Room not found', 404);

    const count = await RoomImage.countDocuments({ roomId });
    if (count >= 10) throw new AppError('Maximum 10 images per room', 400);

    const imageUrl = `/uploads/rooms/${file.filename}`;
    const isPrimary = count === 0;

    return RoomImage.create({
      roomId,
      imageUrl,
      caption,
      isPrimary,
      sortOrder: count,
    });
  },

  async update(
    roomId: string,
    imageId: string,
    data: { caption?: string; isPrimary?: boolean; sortOrder?: number }
  ) {
    if (!Types.ObjectId.isValid(roomId) || !Types.ObjectId.isValid(imageId)) {
      throw new AppError('Invalid id', 400);
    }

    const image = await RoomImage.findOne({ _id: imageId, roomId });
    if (!image) throw new AppError('Image not found', 404);

    if (data.isPrimary) {
      await RoomImage.updateMany({ roomId }, { isPrimary: false });
      image.isPrimary = true;
    }

    if (data.caption !== undefined) image.caption = data.caption;
    if (data.sortOrder !== undefined) image.sortOrder = data.sortOrder;

    await image.save();
    return image;
  },

  async remove(roomId: string, imageId: string) {
    if (!Types.ObjectId.isValid(roomId) || !Types.ObjectId.isValid(imageId)) {
      throw new AppError('Invalid id', 400);
    }

    const image = await RoomImage.findOneAndDelete({ _id: imageId, roomId });
    if (!image) throw new AppError('Image not found', 404);

    if (image.isPrimary) {
      const next = await RoomImage.findOne({ roomId }).sort({ sortOrder: 1 });
      if (next) {
        next.isPrimary = true;
        await next.save();
      }
    }

    return { message: 'Image deleted successfully' };
  },
};
