const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const registerUser = async ({
  fullName,
  email,
  phone,
  password,
  role
}) => {
  const existingUser = await userModel.findUserByEmail(email);

  if (existingUser) {
    throw new Error("An account with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userModel.createUser({
    fullName,
    email,
    phone,
    password: hashedPassword,
    role
  });

  return user;
};

const loginUser = async (email, password, rememberMe = false) => {
  const user = await userModel.findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatch) {
    throw new Error("Invalid email or password");
  }

  const expiresIn = rememberMe ? "30d" : "1d";

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    {
      expiresIn
    }
  );

  const { password: _, ...safeUser } = user;

  return {
    token,
    expiresIn,
    user: safeUser
  };
};

module.exports = {
  registerUser,
  loginUser
};