const odbc = require("msnodesqlv8");

const connectionString =
  "Driver={ODBC Driver 18 for SQL Server};" +
  "Server=AWAIS-ALI\\MSSQLSERVER01;" +
  "Database=ResiCareProDatabase;" +
  "Trusted_Connection=Yes;" +
  "TrustServerCertificate=Yes;";

console.log("Testing ODBC connection...");
console.log("Server: AWAIS-ALI\\MSSQLSERVER01");
console.log("Database: ResiCareProDatabase");
console.log("Driver: ODBC Driver 18 for SQL Server");

odbc.open(connectionString, (error, connection) => {
  if (error) {
    console.error("ODBC CONNECTION FAILED:");
    console.error(error);
    return;
  }

  console.log("ODBC CONNECTION SUCCESSFUL");

  connection.query(
    "SELECT DB_NAME() AS DatabaseName",
    (error, result) => {
      if (error) {
        console.error("DATABASE QUERY FAILED:");
        console.error(error);
        connection.close();
        return;
      }

      console.log("DATABASE RESULT:");
      console.log(result);

      connection.close();
    }
  );
});