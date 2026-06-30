import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { authService } from './auth.service';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.register(req.body);
  res.status(201).json({ success: true, data: result });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const result = await authService.login(req.body.email, req.body.password);
  res.json({ success: true, data: result });
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const data = await authService.getMe(req.user!.id);
  res.json({ success: true, data });
});
