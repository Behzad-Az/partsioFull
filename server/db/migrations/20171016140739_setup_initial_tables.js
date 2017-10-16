
exports.up = function(knex, Promise) {
  return Promise.all([

    knex.schema.createTableIfNotExists('email_entries', t => {
      t.bigIncrements('id');
      t.string('email', 30).notNullable().unique();
      t.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    })

  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('email_entries')
  ]);
};
