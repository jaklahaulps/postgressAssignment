const pg = require("pg");
const settings = require("./settings"); // settings.json
const input = process.argv[2];
const moment = require("moment");

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

  function printResult(err, results) { 
    console.log(`Found ${results.rows.length} person(s) by the name ${input}:`)
    results.rows.forEach (function (result, index) {
      console.log(`- ${index+1}: ${result.first_name} ${result.last_name}, born '${moment(result.birthdate).format('YYYY-MM-DD')}'`)
    });
  };

  client.query(`SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text`,[input], (err, results) => {
      console.log("Searchng ...");
      if (err) {
        return console.error("error running query", err);
      } else {
        printResult(null, results);
      }
      client.end();
    })

// client.end();
});