const { sql } = require("../config/db");
const { executeQuery } = require("../utils/dbUtils");

const createContact = async ({
  fullName,
  email,
  phone,
  message
}) => {
  return executeQuery(async (request) => {
    const result = await request
      .input("fullName", sql.NVarChar(100), fullName)
      .input("email", sql.NVarChar(255), email)
      .input("phone", sql.NVarChar(20), phone || null)
      .input("message", sql.NVarChar(sql.MAX), message)
      .query(`
        INSERT INTO Contact
        (
          fullName,
          email,
          phone,
          message
        )
        OUTPUT
          INSERTED.id,
          INSERTED.fullName,
          INSERTED.email,
          INSERTED.phone,
          INSERTED.message,
          INSERTED.createdAt
        VALUES
        (
          @fullName,
          @email,
          @phone,
          @message
        )
      `);

    return result.recordset[0];
  });
};

module.exports = {
  createContact
};