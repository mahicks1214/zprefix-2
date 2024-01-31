/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {first_name: 'Michael', last_name: 'Hickson', username:'mhickson89', password_hash: 1234},
    {first_name: 'Travis', last_name: 'Hickson', username:'thickson90', password_hash: 5678}
  ]);
};
