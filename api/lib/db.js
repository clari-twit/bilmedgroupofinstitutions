import mysql from "mysql";
import "dotenv/config";
import util from "util";
import tablesToCreate from "./createTables.js";

var connection = mysql.createConnection({
  host: `${process.env.DATABASE_HOST}`,
  user: `${process.env.DATABASE_USERNAME}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: `${process.env.DATABASE_NAME}`,
});
connection.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log("Database Connected Successfully..!!");
  }
});

connection.connect(function (error) {
  if (!!error) {
    console.log(error);
  } else {
    console.log("Database Connected Successfully..!!");
    createTables();
  }
});

async function createTables() {
  try {
    for (const table of tablesToCreate) {
      const result = await queryAsync(`SHOW TABLES LIKE '${table.name}'`);
      if (result.length === 0) {
        await queryAsync(table.query);
        console.log(`Table ${table.name} created successfully`);
      } else {
        console.log(`Table ${table.name} already exists`);
      }
    }
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}
const queryAsync = util.promisify(connection.query).bind(connection);

export default queryAsync;
