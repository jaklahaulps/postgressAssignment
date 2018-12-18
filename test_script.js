const pg = require("pg");
const settings = require("./settings"); // settings.json
const input = process.argv[2];

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

  function printResult(err, result){ 
    console.log(result.rows); //output: 1
  };

  client.query(`SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text`,[input], (err, result) => {
      console.log("Searchng ...");
      if (err) {
        return console.error("error running query", err);
      } else {
        printResult(null, result);
      }
      client.end();
    })

// client.end();
});