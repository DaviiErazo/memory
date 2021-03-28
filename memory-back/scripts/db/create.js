const sqlite3 = require('sqlite3');

require('dotenv').config();
const { NODE_ENV } = process.env;

/**
 * CREATE DATABASE FOR DEV OR TEST ENVIROMENT 
 * */

new sqlite3.Database(`${__dirname}${NODE_ENV}-db.sqlite`, (err) => {
    if (err)
      return console.error(err.message);
    else
        console.log(`DATABASE CREATED ${NODE_ENV}-db`);

    process.exit(0);
});