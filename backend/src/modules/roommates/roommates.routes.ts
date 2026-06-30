import { Router } from 'express';
import { authenticate, authorize } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import { assignSchema, unassignSchema, roomIdParamSchema } from './roommates.validation';
import { getRoommates, assignStudent, unassignStudent } from './roommates.controller';

const router = Router({ mergeParams: true });

router.get('/', authenticate, validate(roomIdParamSchema), getRoommates);
router.post('/assign', authenticate, authorize('admin'), validate(assignSchema), assignStudent);
router.post('/unassign', authenticate, authorize('admin'), validate(unassignSchema), unassignStudent);

export default router;
