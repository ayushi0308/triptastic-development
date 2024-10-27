const { Booking, RefundStatus } = require("../models/index");
const { AppError } = require("../utils/error-handler");
const { validationError } = require("../utils/Validation-error");
const { StatusCodes } = require("http-status-codes");
class BookingRepository {
  #createFilter(user) {
    let filter = {
      // isDeleted: false,
    };
    if (user.role == "Admin") {
      return filter;
    } else {
      filter.userId = user.id;
    }
    return filter;
  }
  async create(data) {
    try {
      const booking = await Booking.create(data);
      return booking;
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        throw new validationError(error);
      }
      throw new AppError(
        "RepositoryError",
        "Cannot create Booking",
        "There was some issue creating the booking please again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  async updateBooking(bookingId, data) {
    try {
      console.log("DATA", data);
      await Booking.update(data, {
        where: {
          id: bookingId,
        },
      });
      return true;
    } catch (error) {
      console.log(error);
      console.log("Somthing went wrong in repository layer");
    }
  }
  async getBookingById(bookingId) {
    try {
      const booking = await Booking.findByPk(bookingId);
      return booking;
    } catch (error) {
      throw new AppError(
        "RepositoryError",
        "Cannot Retrieve Booking",
        "There was some issue retrieving the booking, please try again later",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
  async getRefundStatus(user) {
    try {
      const filterObject = this.#createFilter(user);
      console.log(filterObject);
      const bookings = await RefundStatus.findAll({
        where: filterObject,
      });
      console.log(bookings);
      return bookings;
    } catch (error) {
      console.log("Somthing went wrong in the repository layer");
      throw { error };
    }
  }
  async getAll(user) {
    try {
      const filterObject = this.#createFilter(user);
      console.log(filterObject);
      const bookings = await Booking.findAll({
        where: filterObject,
      });
      console.log(bookings);
      return bookings;
    } catch (error) {
      console.log("Somthing went wrong in the repository layer");
      throw { error };
    }
  }
}

module.exports = BookingRepository;
