import { Router } from 'express';
import { authenticate, authorize } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import {
  createRoomSchema,
  updateRoomSchema,
  roomIdSchema,
  createBuildingSchema,
} from './rooms.validation';
import {
  listRooms,
  getRoom,
  getFacilities,
  createRoom,
  updateRoom,
  listBuildings,
  createBuilding,
} from './rooms.controller';

const router = Router();

router.get('/buildings/list', authenticate, listBuildings);
router.post('/buildings', authenticate, authorize('admin'), validate(createBuildingSchema), createBuilding);
router.get('/', authenticate, listRooms);
router.get('/:id', authenticate, validate(roomIdSchema), getRoom);
router.get('/:id/facilities', authenticate, validate(roomIdSchema), getFacilities);
router.post('/', authenticate, authorize('admin'), validate(createRoomSchema), createRoom);
router.patch('/:id', authenticate, authorize('admin'), validate(updateRoomSchema), updateRoom);

export default router;
