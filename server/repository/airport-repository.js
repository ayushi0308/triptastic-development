const { Airport } = require("../models/index");

class AirportRepository {
  async getAll() {
    try {
      const airports = await Airport.findAll();
      return airports;
    } catch (error) {
      console.log("Somthing went wrong in the repository layer");
      throw { error };
    }
  }
  async getName(id) {
    try {
      console.log();
      const airport = await Airport.findByPk(id);
      const airportName = airport.name;
      return airportName;
    } catch (error) {
      console.log("Somthing went wrong in the repository layer");
      throw { error };
    }
  }
}

module.exports = AirportRepository;
