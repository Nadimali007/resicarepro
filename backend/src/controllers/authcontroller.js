const authService = require("../services/authService.js");

const register = async (req, res) => {
  try {
    console.log("REQUEST HEADERS:", req.headers);
    console.log("REQUEST BODY:", req.body);

    const {
      fullName,
      email,
      phone,
      password
    } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Full name, email and password are required"
      });
    }

    const user = await authService.registerUser({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : null,
      password,
      role: "user"
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user
    });
  } catch (error) {
    console.error("Registration error:", error.message);

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
const login = async (req, res) => {
  try {
    const {
      email,
      password,
      rememberMe
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const result = await authService.loginUser(
      email.trim().toLowerCase(),
      password,
      rememberMe === true
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token: result.token,
      expiresIn: result.expiresIn,
      user: result.user
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  register,
  login
};