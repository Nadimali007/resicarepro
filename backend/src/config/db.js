const sql = require("mssql/msnodesqlv8");
require("dotenv").config();

const connectionString =
  `Driver={ODBC Driver 18 for SQL Server};` +
  `Server=${process.env.DB_SERVER};` +
  `Database=${process.env.DB_DATABASE};` +
  `Trusted_Connection=Yes;` +
  `TrustServerCertificate=Yes;`;

const dbConfig = {
  connectionString
};

let pool;

const connectDB = async () => {
  try {
    console.log("Connecting to SQL Server...");
    console.log(`Server: ${process.env.DB_SERVER}`);
    console.log(`Database: ${process.env.DB_DATABASE}`);

    pool = await sql.connect(dbConfig);

    console.log("SQL Server connected successfully");

    return pool;
  } catch (error) {
    console.error("SQL Server connection failed:");
    console.error(error.message);
    throw error;
  }
};

const getPool = () => {
  if (!pool) {
    throw new Error("Database connection has not been established");
  }

  return pool;
};

module.exports = {
  sql,
  connectDB,
  getPool
};