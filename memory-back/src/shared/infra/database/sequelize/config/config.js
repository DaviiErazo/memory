require("dotenv").config();
const Sequelize = require("sequelize");

const {
  MEMORY_DB_USER,
  MEMORY_DB_PASS,
  MEMORY_DB_HOST,
  MEMORY_DB_PROD_DB_NAME,
  NODE_ENV,
  MEMORY_IS_PRODUCTION,
  CLEARDB_DATABASE_URL,
} = process.env;

const storage = `${__dirname}/${NODE_ENV}-db.sqlite`;

const databaseCredentials = {
  development: {
    dialect: "sqlite",
  },
  test: {
    dialect: "sqlite",
  },
  production: {
    username: MEMORY_DB_USER,
    password: MEMORY_DB_PASS,
    database: MEMORY_DB_PROD_DB_NAME,
    host: MEMORY_DB_HOST,
    dialect: "sqlite",
  },
};

const { dialect } = databaseCredentials[NODE_ENV];

module.exports = databaseCredentials;

const mode = MEMORY_IS_PRODUCTION === "true" ? "prod" : "dev";

console.log(`[DB]: Connecting to the database in ${mode} mode.`);

module.exports.connection =
  MEMORY_IS_PRODUCTION === "true"
    ? new Sequelize(CLEARDB_DATABASE_URL)
    : new Sequelize({
        storage,
        dialect,
        port: 3306,
        dialectOptions: {
          multipleStatements: true,
        },
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
        logging: false,
      });
