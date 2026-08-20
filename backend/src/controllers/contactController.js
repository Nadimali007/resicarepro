const contactService = require("../services/contactService");

const submitContact = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      message
    } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Full name, email and message are required"
      });
    }

    const contact = await contactService.submitContact({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : null,
      message: message.trim()
    });

    return res.status(201).json({
      success: true,
      message: "Message submitted successfully",
      contact
    });
  } catch (error) {
    console.error("Contact submission error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to submit your message. Please try again."
    });
  }
};

module.exports = {
  submitContact
};