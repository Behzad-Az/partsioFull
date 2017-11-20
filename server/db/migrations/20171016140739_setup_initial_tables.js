
exports.up = function(knex, Promise) {
  return Promise.all([

    knex.schema.createTableIfNotExists('email_entries', t => {
      t.bigIncrements('id');
      t.string('email', 30).notNullable().unique();
      t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    }),

    knex.schema.createTableIfNotExists('messages', t => {
      t.bigIncrements('id');
      t.string('from_name', 50).notNullable();
      t.string('from_email', 50).notNullable();
      t.string('from_phone', 20).notNullable();
      t.string('subject', 50).notNullable();
      t.string('content', 500).notNullable();
      t.string('item_id', 11).notNullable();
    })

  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('email_entries'),
    knex.schema.dropTable('messages')
  ]);
};
