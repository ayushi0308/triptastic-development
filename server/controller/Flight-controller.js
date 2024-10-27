const { FlightService } = require("../services/index");
const { SuccessCodes } = require("../utils/error-codes");
const flightService = new FlightService();

const create = async (req, res) => {
  const flightRequestData = {
    departureAirportId: req.body.departureAirportId,
    arrivalAirtportId: req.body.arrivalAirtportId,
    arrivalTime: req.body.arrivalTime,
    departureTime: req.body.departureTime,
    price: req.body.price,
    totalSeats: req.body.totalSeats,
  };

  try {
    const flight = await flightService.createFlight(flightRequestData);
    console.log(req.body);
    return res.status(SuccessCodes.CREATED).json({
      data: flight,
      success: true,
      err: {},
      message: "Successfully created a flight",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to create a flight",
      err: error,
    });
  }
};

const searchFlight = async (req, res) => {
  try {
    console.log(req.body.query);
    const response = await flightService.searchFlights(req.body.query);
    return res.status(SuccessCodes.OK).json({
      data: response,
      success: true,
      err: {},
      message: "Successfully fetched all the flights",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to get  all flight",
      err: error,
    });
  }
};

const get = async (req, res) => {
  try {
    const response = await flightService.getFlight(req.params.id);
    return res.status(SuccessCodes.OK).json({
      data: response,
      success: true,
      err: {},
      message: "Successfully fetched the flight",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to get  flight",
      err: error,
    });
  }
};
const update = async (req, res) => {
  try {
    const response = await flightService.updateFlight(req.params.id, req.body);
    console.log(req.params.id, req.body, "REQ");
    return res.status(SuccessCodes.OK).json({
      data: response,
      success: true,
      err: {},
      message: "Successfully updated the flight",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to update  flight",
      err: error,
    });
  }
};

const deleteFlight = async (req, res) => {
  try {
    const response = await flightService.deleteFlight(req.params.id);
    console.log(req.params.id, "REQ");
    return res.status(SuccessCodes.OK).json({
      data: response,
      success: true,
      err: {},
      message: "Successfully Deleted the flight",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: {},
      success: false,
      message: "Not able to update  flight",
      err: error,
    });
  }
};

module.exports = {
  create,
  searchFlight,
  get,
  update,
  deleteFlight,
};
