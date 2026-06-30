import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { param } from '../../utils/param';
import { roommatesService } from './roommates.service';

export const getRoommates = asyncHandler(async (req: Request, res: Response) => {
  const data = await roommatesService.getByRoom(param(req.params.id));
  res.json({ success: true, data });
});

export const getMyRoommates = asyncHandler(async (req: Request, res: Response) => {
  const data = await roommatesService.getMyRoommates(req.user!.id);
  res.json({ success: true, data });
});

export const assignStudent = asyncHandler(async (req: Request, res: Response) => {
  const data = await roommatesService.assign(param(req.params.id), req.body.userId);
  res.status(201).json({ success: true, data });
});

export const unassignStudent = asyncHandler(async (req: Request, res: Response) => {
  const data = await roommatesService.unassign(param(req.params.id), req.body.userId);
  res.json({ success: true, data });
});
