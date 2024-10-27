import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios";
import moment from "moment";
import { createSelectNumberRange } from "./../../helpers/input_helpers";
import PersonalInfoDialog from "./PersonalInfoDialog";
import ReduxTextField from "./fields/ReduxTextField";
import ReduxSelectField from "./fields/ReduxSelectField";
import ReduxCheckbox from "./fields/ReduxCheckbox";
import ReduxRadioGroup from "./fields/ReduxRadioGroup";
import * as Constants from "../../constants";
import validate from "./validation/flight_form_validation";
import {
  setPersonalInfoDialogOpen,
  setSnackbarSettings,
  setAirports,
  setFlights,
} from "./../../actions";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import ReduxAutoComplete from "./fields/ReduxAutoComplete";
import LocalApi from "../../apis/local";

class FlightForm extends Component {
  onFormSubmit = (formValues) => {
    // this.props.setPersonalInfoDialogOpen(true);
    console.log("Form Values:", formValues);
    const data1 = {
      query: {
        formValues,
      },
    };

    console.log(data1);
    LocalApi.post(Constants.BASE_URL + "/api/searchFlight", {
      query: formValues,
    })
      .then((response) => {
        console.log(response);
        this.props.setFlights(response.data.data);
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
  async componentDidMount() {
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
    const { handleSubmit, cities, initialValues } = this.props;
    return (
      <>
        <form onSubmit={handleSubmit(this.onFormSubmit)}>
          <div>
            <Field
              name="departureAirportId"
              component={ReduxAutoComplete}
              label="Departure Airport"
              selectOptions={cities}
              margin="dense"
            />
          </div>
          <div>
            <Field
              name="arrivalAirportId"
              component={ReduxAutoComplete}
              label="Arrival Airport"
              selectOptions={cities}
              margin="dense"
            />
          </div>

          <div>
            <Field
              type="date"
              name="departureTime"
              label="Departure Date"
              defaultValue={initialValues.departureTime}
              onChange={(event, value) => {
                console.log(initialValues);
                console.log(value);

                this.props.initialValues.departureTime = value;
                console.log(this.props.initialValues);
              }}
              component={ReduxTextField}
              margin="dense"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div style={{ marginTop: 18 }}>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth={true}
            >
              Get Flights
            </Button>
          </div>
        </form>
        <PersonalInfoDialog quoteType="Flight" />
      </>
    );
  }
}

const WrappedFlightForm = reduxForm({
  form: "FlightForm",
  validate,
})(FlightForm);

const mapStateToProps = (state) => {
  return {
    dialogOpen: state.dialog.personalInfoDialog.open,
    cities: state.airport.airports,
    initialValues: {
      // ticket_type: "return",
      // start_date: moment().format("YYYY-MM-DD"),
      // end_date: moment().format("YYYY-MM-DD"),
      // adults: 1,
      // children: 0,
      // seat_type: "economy",
      // flexible_dates: false,
      departureTime: moment().format("YYYY-MM-DD"),
      arrivalAirportId: 0,
      departureAirportId: 0,
    },
  };
};

export default connect(
  mapStateToProps,
  { setPersonalInfoDialogOpen, setSnackbarSettings, setAirports, setFlights }
)(withRouter(WrappedFlightForm));
