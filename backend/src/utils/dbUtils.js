const { getPool } = require("../config/db");

const executeQuery = async (callback) => {
  try {
    const pool = getPool();
    const request = pool.request();

    return await callback(request);
  } catch (error) {
    console.error("Database query error:", error.message);
    throw error;
  }
};

module.exports = {
  executeQuery
};