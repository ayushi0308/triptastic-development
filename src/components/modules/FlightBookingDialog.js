import React from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { TextField } from "@material-ui/core";
import { setSnackbarSettings } from "../../actions";
import * as Constants from "../../constants";
import { withRouter } from "react-router-dom";
import LocalApi from "../../apis/local";

import axios from "axios";

const FlightBookingDialog = ({
  open,
  handleClose,
  title,
  airportName,
  authToken,
  price,
  totalSeats,
  history,
  id,
  user,
}) => {
  const [formData, setFormData] = useState({
    seats: 0,
  });

  const { seats } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = (form) => {
    LocalApi.post(Constants.BASE_URL + "/api/bookings", form)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        let message = "Server Error. Please try again later";
        if (err.response && err.response.status === 401) {
          message = "Invalid email or password";
        }
        setSnackbarSettings({
          open: true,
          variant: "error",
          message,
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const bookingData = {
      noOfSeats: parseInt(seats),
      userId: user,
      flightId: id,
    };

    console.log("Booking Data:", bookingData);
    submitForm(bookingData);
    window.alert("Your Ticket is Booked Succesfully");
    history.push("/bookings"); // Redirect to '/bookings' route

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{`Booking: ${title}`}</DialogTitle>
      <DialogContent>
        <p>Total Seats Available: {totalSeats}</p>
        <p>Price: {price}</p>
        <p>Total Price will be ₹ : {price * seats} </p>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Number of Seats"
            name="seats"
            type="number"
            value={seats}
            onChange={handleInputChange}
            InputProps={{ inputProps: { min: 1 } }}
            required
          />
          <Button type="submit" color="primary" variant="contained">
            Confirm Booking
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        {/* <Button onClick={handleClose} color="primary" variant="contained">
          Confirm Booking
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};

FlightBookingDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  airportName: PropTypes.array.isRequired, // Assuming airportName is an array
  authToken: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  totalSeats: PropTypes.number.isRequired,
  user: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {
    airportName: state.airport.airports,
    authToken: state.auth.token,
  };
};

export default connect(
  mapStateToProps,
  { setSnackbarSettings }
)(withRouter(FlightBookingDialog));
