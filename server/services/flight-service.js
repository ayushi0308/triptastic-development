const { FlightRepository } = require("../repository/index");
const compareTime = require("../utils/helper");

class FlightService {
  constructor() {
    // this.airPlaneRepository = new AirplaneRepository();
    this.flightRepository = new FlightRepository();
  }

  async createFlight(data) {
    try {
      console.log(data);
      const flight = await this.flightRepository.createFlight(data);
      return flight;
    } catch (error) {
      console.log("Somthing went wrong at service layer");
      throw { error };
    }
  }

  async searchFlights(data) {
    try {
      const flights = await this.flightRepository.searchFlight(data);
      return flights;
    } catch (error) {
      console.log("Somthing went wrong at service layer");
    }
  }

  async getFlight(flightId) {
    try {
      const flight = await this.flightRepository.getFlight(flightId);
      return flight;
    } catch (error) {
      console.log("Something went wrong at service");
    }
  }
  async updateFlight(flightId, data) {
    try {
      console.log("DATA", data);
      console.log("Flight Id", flightId);
      const response = await this.flightRepository.updateFlight(flightId, data);
      if (response) {
        return true;
      } else false;
    } catch (error) {
      console.log("Somthing went wrong in repository layer");
    }
  }
  async deleteFlight(flightId) {
    try {
      console.log("SDATA", flightId);
      const response = await this.flightRepository.deleteFlight(flightId);
      return response;
    } catch (error) {
      console.log("Somthing went wrong at service layer");
      throw { error };
    }
  }
}

module.exports = FlightService;
