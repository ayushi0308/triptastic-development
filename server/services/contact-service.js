const {
  ContactRepository,
  FlightRepository,
  AirportRepository,
} = require("../repository/index");
const nodemailer = require("nodemailer");

class ContactService {
  constructor() {
    this.ContactRepository = new ContactRepository();
    this.FlightRepository = new FlightRepository();
    this.AirportRepository = new AirportRepository();
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      // port: 465,
      // secure: true,
      auth: {
       // user: 
       // pass: 
      },
    });
  }
  // Add Authentication Details from Database.txt File to Start Mail Server


  async create(data) {
    try {
      this.sendEmail(
        data.firstName,
        data.lastName,
        data.email,
        data.subject,
        data.message
      );
      const contactUs = await this.ContactRepository.create(data);
      return contactUs;
    } catch (error) {
      console.log("Something went wrong at service");
    }
  }
  async sendEmail(firstName, lastName, email, subject, message) {
    try {
      console.log(message);
      let textMessage =
        "Dear " +firstName +
        (lastName ? " " + lastName : "") +
        ",\n\nHere are the Flight Details:";
      let tableHtml =
        "<table style='border-collapse: collapse; width: 100%;' border='1'>" +
        "<thead>" +
        "<tr style='background-color: #f2f2f2;'>" +
        "<th style='padding: 10px;'>Departure Airport</th>" +
        "<th style='padding: 10px;'>Arrival Airport</th>" +
        "<th style='padding: 10px;'>Arrival Time</th>" +
        "<th style='padding: 10px;'>Departure Time</th>" +
        "<th style='padding: 10px;'>Price</th>" +
        "<th style='padding: 10px;'>Total Seats Available</th>" +
        "</tr>" +
        "</thead>" +
        "<tbody>";

      const flightDetails = await this.FlightRepository.getAllFlight();

      const airportPromises = flightDetails.map(async (flight) => {
        const arrivalTime = new Date(flight.arrivalTime);
        const formattedArrivalTime = `${arrivalTime.getDate()} ${arrivalTime.toLocaleString(
          "default",
          { month: "short" }
        )} ${arrivalTime.getFullYear()} ${arrivalTime.getHours()}:${arrivalTime.getMinutes()}`;

        const departureTime = new Date(flight.departureTime);
        const formattedDepartureTime = `${departureTime.getDate()} ${departureTime.toLocaleString(
          "default",
          { month: "short" }
        )} ${departureTime.getFullYear()} ${departureTime.getHours()}:${departureTime.getMinutes()}`;

        const departureAirportNamePromise = this.AirportRepository.getName(
          flight.departureAirportId
        );
        const arrivalAirportNamePromise = this.AirportRepository.getName(
          flight.arrivalAirtportId
        );

        const [departureAirportName, arrivalAirportName] = await Promise.all([
          departureAirportNamePromise,
          arrivalAirportNamePromise,
        ]);


        tableHtml +=
          "<tr>" +
          `<td style='padding: 10px;'>${departureAirportName}</td>` +
          `<td style='padding: 10px;'>${arrivalAirportName}</td>` +
          `<td style='padding: 10px;'>${formattedArrivalTime}</td>` +
          `<td style='padding: 10px;'>${formattedDepartureTime}</td>` +
          `<td style='padding: 10px;'> ${flight.price}</td>` +
          `<td style='padding: 10px;'>${flight.totalSeats}</td>` +
          "</tr>";
      });

      await Promise.all(airportPromises);

      tableHtml += "</tbody></table>";

      await this.transporter.sendMail({
        from: "tripTastic@gmail.com",
        to: email,
        subject: subject,
        html: textMessage + "<br><br>" + tableHtml,
      });
      console.log("Email sent successfully", tableHtml);
    } catch (error) {
      console.log("Error sending email:", error);
    }
  }
}

module.exports = ContactService;
