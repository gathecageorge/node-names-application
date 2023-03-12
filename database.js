const { Pool } = require('pg');

let connectionConfig = {
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT
};
let dbName = (process.env.DATABASE_NAME).toLocaleLowerCase();

const connectionPool = async() => {
  //create database on non production environment
  if (process.env.NODE_ENV !== 'production') { 
    let conn = new Pool(connectionConfig);

    let res = await conn.query(`SELECT datname FROM pg_catalog.pg_database WHERE lower(datname) = lower('${dbName}')`);
    if(res.rowCount == 0){
      await conn.query(`CREATE DATABASE ${dbName}`);
      console.log(`Created database`);
    } else {
      console.log(`Database exists`);
    }
  }

  connectionConfig['database'] = dbName;
  conn = new Pool(connectionConfig);
  
  dataSql = `CREATE TABLE IF NOT EXISTS contacts (id SERIAL NOT NULL PRIMARY KEY, f_name varchar(100) NOT NULL, created_by_pod text NOT NULL, created_at timestamp NOT NULL DEFAULT now());`;
  await conn.query(dataSql);
  console.log(`Database initialized`);  

  return conn;
}

module.exports = connectionPool;
