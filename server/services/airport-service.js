const { AirportRepository } = require("../repository/index");

class AirportService {
  constructor() {
    this.AirportRepository = new AirportRepository();
  }

  async getAll() {
    try {
      const airports = await this.AirportRepository.getAll();
      return airports;
    } catch (error) {
      console.log("Something went wrong at service");
    }
  }
}

module.exports = AirportService;
