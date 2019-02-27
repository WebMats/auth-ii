
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
    tbl
        .increments()
        .notNullable();
    tbl
        .string('username', 128)
        .unique()
        .notNullable();
    tbl
        .string('hash', 255)
        .notNullable();
    tbl
        .string('department', 128);
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
