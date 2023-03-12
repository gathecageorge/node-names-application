const { Pool } = require('pg');

console.log(`HOST: ${process.env.DATABASE_HOST}`);
console.log(`USER: ${process.env.DATABASE_USER}`);
console.log(`PASS: ${process.env.DATABASE_PASSWORD}`);
console.log(`PORT: ${process.env.DATABASE_PORT}`);
console.log(`DB: ${process.env.DATABASE_NAME}`);

let dbName = (process.env.DATABASE_NAME).toLocaleLowerCase();
let connectionConfig = {
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT
};

const connectionPool = async() => {
  let conn = new Pool(connectionConfig);

  let res = await conn.query(`SELECT datname FROM pg_catalog.pg_database WHERE lower(datname) = lower('${dbName}')`);
  if(res.rowCount == 0){
    await conn.query(`CREATE DATABASE ${dbName}`);
    console.log(`Created database`);
  } else {
    console.log(`Database exists`);
  }

  connectionConfig['database'] = dbName;
  conn = new Pool(connectionConfig);
  
  dataSql = `CREATE TABLE IF NOT EXISTS contacts (id SERIAL NOT NULL PRIMARY KEY, f_name varchar(100) NOT NULL, created_by_pod text NOT NULL, created_at timestamp NOT NULL DEFAULT now());`;
  await conn.query(dataSql);
  console.log(`Database initialized`);  

  return conn;
}

module.exports = connectionPool;
