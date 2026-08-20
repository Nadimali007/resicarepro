const contactModel = require("../models/contactModel");

const submitContact = async ({
  fullName,
  email,
  phone,
  message
}) => {
  const contact = await contactModel.createContact({
    fullName,
    email,
    phone,
    message
  });

  return contact;
};

module.exports = {
  submitContact
};