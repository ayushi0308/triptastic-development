import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import QuillEditor from "./fields/QuillEditor";
import ReduxCheckbox from "./fields/ReduxCheckbox";
import ReduxTextField from "./fields/ReduxTextField";
import validate, { validateImage } from "./validation/tour_form_validation";
import {
  createOrUpdateTour,
  getTour,
  setTour,
  createFlights,
} from "./../../actions";
import ReduxAutoComplete from "./fields/ReduxAutoComplete";

class TourForm extends Component {
  onFormSubmit = (formValues) => {
    const { createFlights } = this.props;
    console.log(formValues);
    createFlights(formValues);
    // const { createOrUpdateTour, tour_id, history } = this.props;
    // if (formValues.image) {
    //   formValues.image = formValues.image[0];
    // }
    // let formData = new FormData();
    // for (let key in formValues) {
    //   formData.append(key, formValues[key]);
    // }
    // createOrUpdateTour(tour_id, formData);
    // history.push(`/tours/${tour_id}`);
  };

  componentDidMount() {
    const { match, getTour, setTour } = this.props;
    const { id } = match.params;
    if (id) {
      getTour(id);
    } else {
      setTour({});
    }
  }

  render() {
    const { tour_id, handleSubmit, cities } = this.props;
    // console.log(cities);
    return (
      <div style={{ padding: "50px 0px" }}>
        <Grid container justify="center">
          <Grid item xs={12} sm={10} md={8}>
            <Paper style={{ padding: "12px 24px 24px" }}>
              <Typography variant="h3" gutterBottom>
                Create Flight
              </Typography>
              <form onSubmit={handleSubmit(this.onFormSubmit)}>
                <div>
                  <Field
                    name="arrivalAirtportId"
                    component={ReduxAutoComplete}
                    label="Arrival Airport"
                    selectOptions={cities}
                    margin="dense"
                  />
                </div>
                <div>
                  {" "}
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
                    type="number"
                    name="price"
                    label="Price"
                    defaultValue={0}
                    component={ReduxTextField}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">₹</InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div>
                  <Field
                    type="date"
                    name="arrivalTime"
                    label="Arrival Date"
                    defaultValue={""}
                    component={ReduxTextField} // Use your ReduxDateTimePicker component here
                    margin="dense"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>
                <div>
                  <Field
                    type="date"
                    name="departureTime"
                    label="Arrival Date"
                    defaultValue={""}
                    component={ReduxTextField} // Use your ReduxDateTimePicker component here
                    margin="dense"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </div>

                <div>
                  <Field
                    type="number"
                    name="totalSeats"
                    label="Total Seats"
                    component={ReduxTextField}
                    margin="normal"
                  />
                </div>
                {/* <div>
                  <Field
                    name="image"
                    type="file"
                    label="Featured Image"
                    component={ReduxTextField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                    validate={tour_id ? undefined : validateImage}
                  />
                </div>
                <div>
                  <Field
                    name="featured"
                    label="Feature on home page"
                    component={ReduxCheckbox}
                    margin="dense"
                  />
                </div>
                <div>
                  <InputLabel>Description</InputLabel>
                  <Field
                    name="description"
                    component={QuillEditor}
                    placeholder={"Write description..."}
                  />
                </div> */}
                <div style={{ marginTop: 18 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth={true}
                  >
                    Save
                  </Button>
                </div>
              </form>
              {/* </MuiPickersUtilsProvider> */}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const WrappedTourForm = reduxForm({
  form: "TourForm",
  enableReinitialize: true,
  validate,
})(TourForm);

const mapStateToProps = (state) => {
  const { _id, image, ...initialValues } = state.tour;

  const cities = state.airport.airports;
  return {
    initialValues,
    tour_id: _id,
    cities,
  };
};

export default connect(
  mapStateToProps,
  { createOrUpdateTour, getTour, setTour, createFlights }
)(withRouter(WrappedTourForm));
