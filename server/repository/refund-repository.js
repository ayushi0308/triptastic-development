const { RefundStatus } = require("../models/index");
const { AppError } = require("../utils/error-handler");
const { validationError } = require("../utils/Validation-error");
const { StatusCodes } = require("http-status-codes");

class RefundRepository {
  async create(data) {
    try {
      // console.log(data);
      const refundStatus = await RefundStatus.create(data);
      return refundStatus;
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        throw new validationError(error);
      }
      throw new AppError(
        "RepositoryError",
        "Cannot Refund",
        "There was some issue in Refund Status please again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = RefundRepository;
