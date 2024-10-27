import React, { Component } from "react";
import HeroImage from "./../modules/HeroImage";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as Constants from "../../constants";
import axios from "axios";
import {
  setBookings,
  setFlights,
  setAirports,
  setRefundStatus,
} from "./../../actions";
import LocalApi from "../../apis/local";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tabs,
  Tab,
} from "@material-ui/core";

const styles = (theme) => ({
  pageContentWrapper: {
    minHeight: "calc(100vh - 149px)",
    [theme.breakpoints.up(600)]: {
      minHeight: "calc(100vh - 158px)",
    },
    [theme.breakpoints.up(960)]: {
      minHeight: "calc(100vh - 194px)",
    },
  },
  aboutUsWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paperWrapper: {
    display: "flex",
    width: "70%",
    justifyContent: "flex-start",
    marginBottom: "40px",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      textAlign: "center",
    },
  },
  photo: {
    minWidth: "220px",
    maxWidth: "220px",
    padding: "20px",
  },
  titleText: {
    paddingTop: "10px",
  },
  content: {
    padding: "10px 20px 0 20px",
    textAlign: "justify",
    [theme.breakpoints.down("sm")]: {
      textAlign: "justify",
      padding: "20px",
    },
  },
});

class Bookings extends Component {
  state = {
    activeTab: 0, // 0 for My Bookings, 1 for Refund
  };
  handleTabChange = (event, newValue) => {
    this.setState({ activeTab: newValue });
  };
  cancelBooking = async (bookingId) => {
    try {
      const response = await LocalApi.post(
        Constants.BASE_URL + `/api/deleteBooking/${bookingId}`
      );
      console.log(response.data);
      alert("Booking Cancelled Succesfully");
      const updatedResponse = await LocalApi.get(
        Constants.BASE_URL + "/api/bookings"
      );
      this.props.setBookings(updatedResponse.data.data);

      const updatedRefund = await LocalApi.get(
        Constants.BASE_URL + "/api/refundStatus"
      );
      this.props.setRefundStatus(updatedRefund.data.data);
    } catch (err) {
      let message = "Failed to cancel booking. Please try again later";
      console.error(message);
    }
  };

  async componentDidMount() {
    try {
      const response = await LocalApi.get(Constants.BASE_URL + "/api/bookings");
      console.log(response.data.data);

      this.props.setBookings(response.data.data);
    } catch (err) {
      let message = "Server Error. Please try again later";
      if (err.response && err.response.status === 401) {
        message = "Invalid email or password";
      }
      this.setState({
        snackbarSettings: {
          open: true,
          variant: "error",
          message,
        },
      });
    }
    try {
      const response = await LocalApi.get(
        Constants.BASE_URL + "/api/refundStatus"
      );
      console.log(response.data.data);

      this.props.setRefundStatus(response.data.data);
    } catch (err) {
      let message = "Server Error. Please try again later";
      if (err.response && err.response.status === 401) {
        message = "Invalid email or password";
      }
      this.setState({
        snackbarSettings: {
          open: true,
          variant: "error",
          message,
        },
      });
    }
    LocalApi.post(Constants.BASE_URL + "/api/searchFlight", {
      query: {},
    })
      .then((response) => {
        console.log(response);
        this.props.setFlights(response.data.data);
      })
      .catch((err) => {
        let message = "Server Error. Please try again later";
        console.log(err);
        alert(message);
      });

    try {
      const response = await LocalApi.get(Constants.BASE_URL + "/api/airports");
      console.log(response.data);

      this.props.setAirports(response.data.data);
    } catch (err) {
      let message = "Server Error. Please try again later";
      if (err.response && err.response.status === 401) {
        message = "Invalid email or password";
      }
      this.setState({
        snackbarSettings: {
          open: true,
          variant: "error",
          message,
        },
      });
    }
  }

  render() {
    const { classes, bookings, cities, flights, refundStatus } = this.props;
    const { activeTab } = this.state;

    const findAirportName = (airportId) => {
      const airport = cities.find((item) => item.id === airportId);
      return airport ? airport.name : "Airport Not Found";
    };

    console.log(bookings);
    console.log(flights);
    console.log(cities);

    const getAirportName = (flightId) => {
      console.log(flightId);
      if (flights.length > 0) {
        const flightDetails = flights.find((flight) => flight.id === flightId);
        console.log(flightDetails);
        const arrivalAirportId = flightDetails.arrivalAirtportId;
        const departureAirportId = flightDetails.departureAirportId;
        return (
          findAirportName(departureAirportId) +
          "-" +
          findAirportName(arrivalAirportId)
        );
      }
      //return flightDetails;
    };

    return (
      <div className={classes.pageContentWrapper}>
        <HeroImage imageLink="./londonEye.jpg" height={"40vh"} />
        <div className={classes.aboutUsWrapper}>
          <Typography variant="h4" color="inherit">
            Bookings and Refund Status
          </Typography>
          <Tabs
            value={activeTab}
            onChange={this.handleTabChange}
            indicatorColor="primary"
          >
            <Tab label="My Bookings" />
            <Tab label="Refund" />
          </Tabs>
          {activeTab === 0 && (
            <Paper className={classes.paperWrapper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Booking ID</TableCell>
                    <TableCell>Flight</TableCell>
                    <TableCell>Total Seats Booked</TableCell>
                    <TableCell>Total Cost</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                    {/* Add more table headers as needed */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.id}</TableCell>
                      <TableCell>{getAirportName(booking.flightId)}</TableCell>
                      <TableCell>{booking.noOfSeats}</TableCell>
                      <TableCell>{booking.totalCost}</TableCell>
                      <TableCell>{booking.status}</TableCell>
                      <TableCell>
                        {" "}
                        {booking.status == "Cancelled" ? (
                          <button onClick={() => this.handleTabChange(null, 1)}>
                            See Refund Status
                          </button>
                        ) : (
                          <button
                            onClick={() => this.cancelBooking(booking.id)}
                          >
                            Cancel Ticket
                          </button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          )}
          {activeTab === 1 && (
            <Paper className={classes.paperWrapper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Booking ID</TableCell>
                    <TableCell>Refund Amount (₹)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {refundStatus.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.bookingId}</TableCell>
                      <TableCell>{booking.refundAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    dialogOpen: state.dialog.personalInfoDialog.open,
    cities: state.airport.airports,
    bookings: state.airport.bookings,
    refundStatus: state.airport.refundStatus,
    flights: state.airport.flights,
  };
};

export default connect(
  mapStateToProps,
  {
    setBookings,
    setFlights,
    setAirports,
    setRefundStatus,
  }
)(withStyles(styles)(withRouter(Bookings)));
