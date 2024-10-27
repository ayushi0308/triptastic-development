const { AirportService } = require("../services/index");
const { SuccessCodes } = require("../utils/error-codes");
const airportService = new AirportService();

const getAll = async (req, res) => {
  try {
    const response = await airportService.getAll();
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
      message: "Not able to get  Airport",
      err: error,
    });
  }
};
module.exports = {
  getAll,
};
