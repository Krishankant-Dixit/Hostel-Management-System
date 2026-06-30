import { Router } from 'express';
import { authenticate, authorize } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import { uploadIssueAttachment } from '../../utils/upload';
import {
  createIssueSchema,
  updateIssueSchema,
  issueIdSchema,
  roomIssuesParamSchema,
  listIssuesQuerySchema,
} from './issues.validation';
import {
  createIssue,
  getRoomIssues,
  listAllIssues,
  getIssue,
  updateIssue,
  addAttachment,
  listCategories,
} from './issues.controller';

const roomIssuesRouter = Router({ mergeParams: true });
const globalIssuesRouter = Router();

roomIssuesRouter.post('/', authenticate, validate(createIssueSchema), createIssue);
roomIssuesRouter.get('/', authenticate, validate(roomIssuesParamSchema), getRoomIssues);

globalIssuesRouter.get('/categories', authenticate, listCategories);
globalIssuesRouter.get(
  '/',
  authenticate,
  authorize('admin', 'staff'),
  validate(listIssuesQuerySchema),
  listAllIssues
);
globalIssuesRouter.get('/:issueId', authenticate, validate(issueIdSchema), getIssue);
globalIssuesRouter.patch(
  '/:issueId',
  authenticate,
  authorize('admin', 'staff'),
  validate(updateIssueSchema),
  updateIssue
);
globalIssuesRouter.post(
  '/:issueId/attachments',
  authenticate,
  validate(issueIdSchema),
  uploadIssueAttachment.single('file'),
  addAttachment
);

export { roomIssuesRouter, globalIssuesRouter };
