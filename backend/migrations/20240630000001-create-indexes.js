module.exports = {
  async up(db) {
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('buildings').createIndex({ code: 1 }, { unique: true });
    await db.collection('rooms').createIndex({ buildingId: 1, roomNumber: 1 }, { unique: true });
    await db.collection('rooms').createIndex({ status: 1 });
    await db.collection('roomimages').createIndex({ roomId: 1, sortOrder: 1 });
    await db.collection('roomassignments').createIndex({ roomId: 1, isActive: 1 });
    await db.collection('roomassignments').createIndex({ userId: 1, isActive: 1 });
    await db.collection('roomissues').createIndex({ roomId: 1 });
    await db.collection('roomissues').createIndex({ status: 1 });
    await db.collection('roomissues').createIndex({ reportedById: 1 });
    await db.collection('issuecategories').createIndex({ slug: 1 }, { unique: true });
    await db.collection('issueattachments').createIndex({ issueId: 1 });
    await db.collection('issuestatuslogs').createIndex({ issueId: 1 });
    console.log('Indexes created successfully');
  },

  async down(db) {
    await db.collection('users').dropIndex('email_1');
    await db.collection('buildings').dropIndex('code_1');
    await db.collection('rooms').dropIndex('buildingId_1_roomNumber_1');
    await db.collection('rooms').dropIndex('status_1');
    await db.collection('roomimages').dropIndex('roomId_1_sortOrder_1');
    await db.collection('roomassignments').dropIndex('roomId_1_isActive_1');
    await db.collection('roomassignments').dropIndex('userId_1_isActive_1');
    await db.collection('roomissues').dropIndex('roomId_1');
    await db.collection('roomissues').dropIndex('status_1');
    await db.collection('roomissues').dropIndex('reportedById_1');
    await db.collection('issuecategories').dropIndex('slug_1');
    await db.collection('issueattachments').dropIndex('issueId_1');
    await db.collection('issuestatuslogs').dropIndex('issueId_1');
    console.log('Indexes dropped successfully');
  },
};
