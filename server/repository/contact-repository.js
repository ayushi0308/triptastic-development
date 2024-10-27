const { ContactUs } = require("../models/index");
const { AppError } = require("../utils/error-handler");
const { validationError } = require("../utils/Validation-error");
const { StatusCodes } = require("http-status-codes");

class ContactRepository {
  async create(data) {
    try {
      // console.log(data);
      const contactUs = await ContactUs.create(data);
      return contactUs;
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        throw new validationError(error);
      }
      throw new AppError(
        "RepositoryError",
        "Cannot Create Contact",
        "There was some issue in Refund Status please again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = ContactRepository;
