const { sql } = require("../config/db");
const { executeQuery } = require("../utils/dbUtils");

const findUserByEmail = async (email) => {
  return executeQuery(async (request) => {
    const result = await request
      .input("email", sql.NVarChar(255), email)
      .query(`
        SELECT
          id,
          fullName,
          email,
          phone,
          password,
          role
        FROM Users
        WHERE email = @email
      `);

    return result.recordset[0] || null;
  });
};

const findUserById = async (id) => {
  return executeQuery(async (request) => {
    const result = await request
      .input("id", sql.Int, id)
      .query(`
        SELECT
          id,
          fullName,
          email,
          phone,
          role
        FROM Users
        WHERE id = @id
      `);

    return result.recordset[0] || null;
  });
};

const createUser = async ({
  fullName,
  email,
  phone,
  password,
  role
}) => {
  return executeQuery(async (request) => {
    const result = await request
      .input("fullName", sql.NVarChar(100), fullName)
      .input("email", sql.NVarChar(255), email)
      .input("phone", sql.NVarChar(20), phone || null)
      .input("password", sql.NVarChar(255), password)
      .input("role", sql.NVarChar(50), role)
      .query(`
        INSERT INTO Users
        (
          fullName,
          email,
          phone,
          password,
          role
        )
        OUTPUT
          INSERTED.id,
          INSERTED.fullName,
          INSERTED.email,
          INSERTED.phone,
          INSERTED.role
        VALUES
        (
          @fullName,
          @email,
          @phone,
          @password,
          @role
        )
      `);

    return result.recordset[0];
  });
};

module.exports = {
  findUserByEmail,
  findUserById,
  createUser
};