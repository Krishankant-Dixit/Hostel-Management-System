import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { AppError } from '../../utils/AppError';
import { param } from '../../utils/param';
import { issuesService } from './issues.service';

export const createIssue = asyncHandler(async (req: Request, res: Response) => {
  const data = await issuesService.create(
    param(req.params.id),
    req.user!.id,
    req.user!.role,
    req.body
  );
  res.status(201).json({ success: true, data });
});

export const getRoomIssues = asyncHandler(async (req: Request, res: Response) => {
  const data = await issuesService.getByRoom(param(req.params.id));
  res.json({ success: true, data });
});

export const listAllIssues = asyncHandler(async (req: Request, res: Response) => {
  const data = await issuesService.listAll({
    status: req.query.status as string,
    roomId: req.query.roomId as string,
    priority: req.query.priority as string,
  });
  res.json({ success: true, data });
});

export const getIssue = asyncHandler(async (req: Request, res: Response) => {
  const data = await issuesService.getById(param(req.params.issueId));
  res.json({ success: true, data });
});

export const updateIssue = asyncHandler(async (req: Request, res: Response) => {
  const data = await issuesService.update(param(req.params.issueId), req.user!.id, req.body);
  res.json({ success: true, data });
});

export const addAttachment = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) throw new AppError('Attachment file is required', 400);
  const data = await issuesService.addAttachment(param(req.params.issueId), req.file);
  res.status(201).json({ success: true, data });
});

export const listCategories = asyncHandler(async (_req: Request, res: Response) => {
  const data = await issuesService.listCategories();
  res.json({ success: true, data });
});
