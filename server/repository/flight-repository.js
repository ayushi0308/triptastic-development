const { Flights } = require("../models/index");
const { Op } = require("sequelize");
class FlightRepository {
  #createFilter(data) {
    let filter = {};
    if (data) {
      filter.isDeleted = false;
    }
    if (data.arrivalAirportId) {
      filter.arrivalAirtportId = data.arrivalAirportId;
    }
    if (data.departureAirportId) {
      filter.departureAirportId = data.departureAirportId;
    }

    if (data.departureTime) {
      const departure = new Date(data.departureTime);
      Object.assign(filter, {
        [Op.and]: [
          {
            departureTime: { [Op.gte]: departure },
          },
        ],
      });
    }
    if (data.minPrice && data.maxPrice) {
      Object.assign(filter, {
        [Op.and]: [
          { price: { [Op.lte]: data.maxPrice } },
          { price: { [Op.gte]: data.minPrice } },
        ],
      });
    }
    return filter;
  }

  async createFlight(data) {
    try {
      const flight = await Flights.create(data);
      return flight;
    } catch (error) {
      console.log("Somthing went wrong in the repository layer");
      throw { error };
    }
  }

  async getFlight(flightId) {
    try {
      console.log(flightId);
      const flight = await Flights.findByPk(flightId);
      return flight;
    } catch (error) {
      console.log("Somthing went wrong in the repository layer");
      throw { error };
    }
  }
  async searchFlight(filter) {
    try {
      const filterObject = this.#createFilter(filter);
      console.log(filter);
      const flights = await Flights.findAll({
        where: filterObject,
      });
      return flights;
    } catch (error) {
      console.log("Somthing went wrong in the repository layer");
      throw { error };
    }
  }
  async getAllFlight() {
    try {
      const currentTime = new Date();
      const flights = await Flights.findAll({
        where: {
          departureTime: {
            [Op.gt]: currentTime,
          },
        },
      });
      return flights;
    } catch (error) {
      console.log("Somthing went wrong in the repository layer");
      throw { error };
    }
  }
  async updateFlight(flightId, data) {
    try {
      console.log("DATA", data);
      await Flights.update(data, {
        where: {
          id: flightId,
        },
      });
      return true;
    } catch (error) {
      console.log("Somthing went wrong in repository layer");
    }
  }
  async deleteFlight(flightId) {
    try {
      await Flights.update(
        { isDeleted: true },
        {
          where: {
            id: flightId,
          },
        }
      );
      return true;
    } catch (error) {
      console.log("Somthing went wrong in repository layer");
    }
  }
}

module.exports = FlightRepository;
