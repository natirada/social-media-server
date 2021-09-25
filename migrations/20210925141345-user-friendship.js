module.exports = {
  async up(db) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    await db.collection('users').updateMany({}, {$set: {friends: []}});
  },
  
  async down(db) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    await db.collection('users').updateMany({}, {$unset: {friends: null}});
  }
};
