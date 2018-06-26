const settings = require("./settings");
const knex = require('knex')({
	client: 'pg',
  connection: {
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
 }
});
const args = process.argv[2]



knex('famous_people')
.where('first_name', args)
.orWhere('last_name', args)
.asCallback(function(err, rows) {
  if (err) return console.log(err);
  console.log(`Found ${rows.length} person(s) by the name of '${args}'`)
  rows.forEach(function (value, i) {
  console.log(`- ${i + 1}: ${value.first_name} ${value.last_name}, born '${value.birthdate.toDateString()}'`);
  });
});
