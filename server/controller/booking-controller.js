const { BookingService } = require("../services/index");
const { StatusCodes } = require("http-status-codes");
const bookingService = new BookingService();

const create = async (req, res) => {
  try {
    const response = await bookingService.createBooking(req.body);
    return res.status(StatusCodes.OK).json({
      message: "Successfully completed booking",
      success: true,
      error: {},
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
      err: error.explanation,
      data: {},
    });
  }
};


const deleteBooking = async (req, res) => {
  try {
    console.log(req.params.id);
    const response = await bookingService.deleteBooking(req.params.id);
    return res.status(StatusCodes.OK).json({
      message: "Successfully Deleted booking",
      success: true,
      error: {},
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
      err: error.explanation,
      data: {},
    });
  }
};

const getAll = async (req, res) => {
  try {
    const response = await bookingService.getAll(req.user);
    return res.status(StatusCodes.OK).json({
      data: response,
      success: true,
      err: {},
      message: "Successfully fetched all Booking",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to get  Booking",
      err: error,
    });
  }
};

const getRefundStatus = async (req, res) => {
  try {
    const response = await bookingService.getRefundStatus(req.user);
    return res.status(StatusCodes.OK).json({
      data: response,
      success: true,
      err: {},
      message: "Successfully fetched all Booking",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to get  Booking",
      err: error,
    });
  }
};

module.exports = { create, deleteBooking, getAll, getRefundStatus };
