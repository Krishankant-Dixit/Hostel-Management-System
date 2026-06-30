import { Types } from 'mongoose';
import { AppError } from '../../utils/AppError';
import {
  Room,
  RoomAssignment,
  RoomIssue,
  IssueCategory,
  IssueStatusLog,
  IssueAttachment,
  User,
  IssueStatus,
} from '../../models';

const canReportForRoom = async (roomId: string, userId: string, role: string) => {
  if (role === 'admin' || role === 'staff') return true;
  const assignment = await RoomAssignment.findOne({ roomId, userId, isActive: true });
  return !!assignment;
};

export const issuesService = {
  async create(
    roomId: string,
    reporterId: string,
    role: string,
    data: {
      title: string;
      description: string;
      categoryId?: string;
      facilityType?: string;
      priority?: string;
    }
  ) {
    if (!Types.ObjectId.isValid(roomId)) throw new AppError('Invalid room id', 400);

    const room = await Room.findById(roomId);
    if (!room) throw new AppError('Room not found', 404);

    const allowed = await canReportForRoom(roomId, reporterId, role);
    if (!allowed) throw new AppError('You can only report issues for your assigned room', 403);

    if (data.categoryId) {
      if (!Types.ObjectId.isValid(data.categoryId)) throw new AppError('Invalid category id', 400);
      const category = await IssueCategory.findById(data.categoryId);
      if (!category) throw new AppError('Category not found', 404);
    }

    const issue = await RoomIssue.create({
      roomId,
      reportedById: reporterId,
      categoryId: data.categoryId,
      title: data.title,
      description: data.description,
      facilityType: data.facilityType,
      priority: data.priority || 'medium',
      status: 'open',
    });

    await IssueStatusLog.create({
      issueId: issue._id,
      changedById: reporterId,
      newStatus: 'open',
      note: 'Issue reported',
    });

    return this.getById(issue._id.toString());
  },

  async getByRoom(roomId: string) {
    if (!Types.ObjectId.isValid(roomId)) throw new AppError('Invalid room id', 400);
    return RoomIssue.find({ roomId })
      .populate('reportedById', 'fullName email')
      .populate('assignedToId', 'fullName email')
      .populate('categoryId', 'name slug')
      .sort({ createdAt: -1 });
  },

  async listAll(filters: { status?: string; roomId?: string; priority?: string }) {
    const query: Record<string, unknown> = {};
    if (filters.status) query.status = filters.status;
    if (filters.priority) query.priority = filters.priority;
    if (filters.roomId && Types.ObjectId.isValid(filters.roomId)) {
      query.roomId = filters.roomId;
    }

    return RoomIssue.find(query)
      .populate('roomId', 'roomNumber floor')
      .populate('reportedById', 'fullName email')
      .populate('assignedToId', 'fullName email')
      .populate('categoryId', 'name slug')
      .sort({ createdAt: -1 });
  },

  async getById(issueId: string) {
    if (!Types.ObjectId.isValid(issueId)) throw new AppError('Invalid issue id', 400);

    const issue = await RoomIssue.findById(issueId)
      .populate('roomId', 'roomNumber floor buildingId')
      .populate('reportedById', 'fullName email phone')
      .populate('assignedToId', 'fullName email')
      .populate('categoryId', 'name slug');

    if (!issue) throw new AppError('Issue not found', 404);

    const attachments = await IssueAttachment.find({ issueId });
    const statusLogs = await IssueStatusLog.find({ issueId })
      .populate('changedById', 'fullName email')
      .sort({ createdAt: -1 });

    return { ...issue.toObject(), attachments, statusLogs };
  },

  async update(
    issueId: string,
    changedById: string,
    data: {
      status?: IssueStatus;
      assignedToId?: string;
      priority?: string;
      note?: string;
    }
  ) {
    if (!Types.ObjectId.isValid(issueId)) throw new AppError('Invalid issue id', 400);

    const issue = await RoomIssue.findById(issueId);
    if (!issue) throw new AppError('Issue not found', 404);

    if (data.assignedToId) {
      if (!Types.ObjectId.isValid(data.assignedToId)) throw new AppError('Invalid assignee id', 400);
      const assignee = await User.findById(data.assignedToId);
      if (!assignee) throw new AppError('Assignee not found', 404);
      issue.assignedToId = assignee._id;
    }

    if (data.priority) issue.priority = data.priority as typeof issue.priority;

    if (data.status && data.status !== issue.status) {
      const oldStatus = issue.status;
      issue.status = data.status;

      if (data.status === 'resolved' || data.status === 'closed') {
        issue.resolvedAt = new Date();
      }

      await IssueStatusLog.create({
        issueId: issue._id,
        changedById,
        oldStatus,
        newStatus: data.status,
        note: data.note,
      });
    }

    await issue.save();
    return this.getById(issueId);
  },

  async addAttachment(issueId: string, file: Express.Multer.File) {
    if (!Types.ObjectId.isValid(issueId)) throw new AppError('Invalid issue id', 400);

    const issue = await RoomIssue.findById(issueId);
    if (!issue) throw new AppError('Issue not found', 404);

    const count = await IssueAttachment.countDocuments({ issueId });
    if (count >= 5) throw new AppError('Maximum 5 attachments per issue', 400);

    const fileUrl = `/uploads/issues/${file.filename}`;
    return IssueAttachment.create({ issueId, fileUrl });
  },

  async listCategories() {
    return IssueCategory.find().sort({ name: 1 });
  },
};
