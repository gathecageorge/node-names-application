var mysql = require('mysql');
const fs = require('fs');

var conn = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD
}); 
 
conn.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');

  conn.query("CREATE DATABASE IF NOT EXISTS " + process.env.DATABASE_NAME + ";", function (err, result) {
    if (err) throw err;
    console.log("Database created");

    conn.query("USE mydb;", function (err, result) {
      if (err) throw err;
      console.log("Database used");

      let dataSql = fs.readFileSync('./db.sql').toString();
      dataSql = dataSql.replace(/\n/g, "");

      conn.query(dataSql, function (err, result) {
        if (err) throw err;
        console.log("Tables created");
      });
    });
  });
});

module.exports = conn;