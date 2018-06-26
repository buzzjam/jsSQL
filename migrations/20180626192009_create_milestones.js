exports.up = function(knex, Promise) {  
  return Promise.all([
    knex.schema.table('milestones', function(table){
      table.integer("famous_person_id").unsigned().primary();
      table.foreign("famous_person_id").references('famous_people.id')
    })
  ])
};

exports.down = function(knex, Promise) {  
  return Promise.all([
    knex.schema.table('milestones', table =>{
      drop.column("famous_person_id");
    })
  ])
};