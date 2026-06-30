import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { env } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { authenticate } from './middleware/auth';
import { getMyRoommates } from './modules/roommates/roommates.controller';

import authRoutes from './modules/auth/auth.routes';
import roomsRoutes from './modules/rooms/rooms.routes';
import roommatesRoutes from './modules/roommates/roommates.routes';
import roomImagesRoutes from './modules/room-images/room-images.routes';
import { roomIssuesRouter, globalIssuesRouter } from './modules/issues/issues.routes';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.resolve(env.UPLOAD_DIR)));

app.get('/health', (_req, res) => {
  res.json({ success: true, message: 'HMS API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/me/roommates', authenticate, getMyRoommates);
app.use('/api/rooms', roomsRoutes);
app.use('/api/rooms/:id/roommates', roommatesRoutes);
app.use('/api/rooms/:id/images', roomImagesRoutes);
app.use('/api/rooms/:id/issues', roomIssuesRouter);
app.use('/api/issues', globalIssuesRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
