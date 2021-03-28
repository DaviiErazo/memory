const sqlite3 = require('sqlite3');

require('dotenv').config();
const { NODE_ENV } = process.env;

/**
 * CREATE DATABASE FOR DEV OR TEST ENVIROMENT 
 * */

let db = new sqlite3.Database(`${__dirname}/${NODE_ENV}-db.sqlite`);

console.log(`DATABASE CREATED ${NODE_ENV}-db`);


db.run('CREATE TABLE memories(memory_id, host_name, memory, created_at)');

db.close();