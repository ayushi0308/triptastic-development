import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { DateTimePicker } from "@material-ui/pickers"; // Import DateTimePicker from Material-UI pickers

class ReduxDateTimePicker extends Component {
  handleDateTimeChange = (date) => {
    const {
      input: { onChange },
    } = this.props;
    onChange(date); // Call the onChange method with the selected date-time value
  };

  render() {
    const {
      label,
      meta: { touched, error },
      input,
      ...other
    } = this.props;

    return (
      <DateTimePicker
        {...other}
        {...input}
        label={label}
        value={input.value || null}
        onChange={this.handleDateTimeChange}
        error={touched && error ? true : false}
        helperText={touched && error}
        fullWidth
        inputVariant="outlined"
        format="yyyy-MM-dd HH:mm:ss" // Format for date-time picker
      />
    );
  }
}

export default ReduxDateTimePicker;
