exports.up = function(knex) {
    return knex.schema.createTable('items', function(table) {
        table.increments('item_id').primary();
        table.integer('user_id');
        table.string('item_name', 255);
        table.text('description');
        table.integer('item_quantity');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('items');
};
