const pg = require("pg");
const settings = require("./settings"); // settings.json
const args = process.argv[2]

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
	return console.error("Connection Error", err);
  }
  console.log(`Searching...`)
  client.query(`SELECT * FROM famous_people WHERE first_name = '${args}' OR last_name = '${args}'`, (err, result)=>{
	 if (err) {
	  return console.error("error running query", err);
	}
	console.log(`Found ${result.rows.length} person(s) by the name of '${args}'`)
	result.rows.forEach(function (value, i) {

    console.log(`- ${i + 1}: ${value.first_name} ${value.last_name}, born '${value.birthdate.toDateString()}'`);
  });
	client.end();
  });
});

