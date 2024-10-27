const axios = require("axios");
const {
  BookingRepository,
  FlightRepository,
  RefundRepository,
} = require("../repository/index");
const { LOCALHOST } = require("../config/serverConfig");
const ServiceError = require("../utils/service-error");

class BookingService {
  constructor() {
    this.BookingRepository = new BookingRepository();
    this.FlightRepository = new FlightRepository();
    this.RefundRepository = new RefundRepository();
  }

  async createBooking(data) {
    try {
      const flightId = data.flightId;
      const flightData = await this.FlightRepository.getFlight(flightId);

      let priceOfTheFlight = flightData.price;
      if (data.noOfSeats > flightData.totalSeats) {
        throw new ServiceError(
          "Something went wrong in booking process",
          "Insufficient seats"
        );
      }
      const totalCost = priceOfTheFlight * data.noOfSeats;

      const bookingPayload = { ...data, totalCost };
      const booking = await this.BookingRepository.create(bookingPayload);
      console.log(flightData.totalSeats, booking.noOfSeats);
      const totalSeatData = {
        totalSeats: flightData.totalSeats - booking.noOfSeats,
      };
      await this.FlightRepository.updateFlight(flightId, totalSeatData);

      const finalBooking = await this.BookingRepository.updateBooking(
        booking.id,
        {
          status: "Booked",
        }
      );

      return finalBooking;
    } catch (error) {
      if (
        error.name === "RepositoryError" ||
        error.name === "ValidationError"
      ) {
        throw error;
      }
      throw new ServiceError();
    }
  }

  async getRefundStatus(user) {
    try {
      const booking = await this.BookingRepository.getRefundStatus(user);
      return booking;
    } catch (error) {
      console.log("Something went wrong at service");
    }
  }
  async getAll(user) {
    try {
      const booking = await this.BookingRepository.getAll(user);
      return booking;
    } catch (error) {
      console.log("Something went wrong at service");
    }
  }
  async deleteBooking(bookingId) {
    try {
      const booking = await this.BookingRepository.getBookingById(bookingId);
      const flightId = booking.flightId;
      const flightData = await this.FlightRepository.getFlight(flightId);
      const totalSeat = {
        totalSeats: flightData.totalSeats + booking.noOfSeats,
      };
      const bookingPayload = {
        status: "Cancelled",
        isDeleted: true,
      };
      const deleteBooking = await this.BookingRepository.updateBooking(
        booking.id,
        bookingPayload
      );
      const refundStatus = {
        bookingId: booking.id,
        userId: booking.userId,
        refundAmount: booking.totalCost,
      };
      await this.FlightRepository.updateFlight(flightId, totalSeat);
      await this.RefundRepository.create(refundStatus);
      return deleteBooking;
    } catch (error) {
      if (
        error.name === "RepositoryError" ||
        error.name === "ValidationError"
      ) {
        throw error;
      }
      throw new ServiceError();
    }
  }
}

module.exports = BookingService;
