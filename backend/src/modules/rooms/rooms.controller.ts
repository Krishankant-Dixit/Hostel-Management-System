import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { param } from '../../utils/param';
import { roomsService } from './rooms.service';

export const listRooms = asyncHandler(async (req: Request, res: Response) => {
  const data = await roomsService.list({
    buildingId: req.query.buildingId as string,
    status: req.query.status as string,
    hasStudyTable: req.query.hasStudyTable === 'true' ? true : undefined,
    hasWardrobe: req.query.hasWardrobe === 'true' ? true : undefined,
    hasAttachedWashroom: req.query.hasAttachedWashroom === 'true' ? true : undefined,
    hasFan: req.query.hasFan === 'true' ? true : undefined,
  });
  res.json({ success: true, data });
});

export const getRoom = asyncHandler(async (req: Request, res: Response) => {
  const data = await roomsService.getById(param(req.params.id));
  res.json({ success: true, data });
});

export const getFacilities = asyncHandler(async (req: Request, res: Response) => {
  const data = await roomsService.getFacilities(param(req.params.id));
  res.json({ success: true, data });
});

export const createRoom = asyncHandler(async (req: Request, res: Response) => {
  const data = await roomsService.create(req.body);
  res.status(201).json({ success: true, data });
});

export const updateRoom = asyncHandler(async (req: Request, res: Response) => {
  const data = await roomsService.update(param(req.params.id), req.body);
  res.json({ success: true, data });
});

export const listBuildings = asyncHandler(async (_req: Request, res: Response) => {
  const data = await roomsService.listBuildings();
  res.json({ success: true, data });
});

export const createBuilding = asyncHandler(async (req: Request, res: Response) => {
  const data = await roomsService.createBuilding(req.body);
  res.status(201).json({ success: true, data });
});
