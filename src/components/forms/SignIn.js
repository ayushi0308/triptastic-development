import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import ReduxTextField from "./fields/ReduxTextField";
import validate from "./validation/login_form_validation";
import LocalApi from "./../../apis/local";
import { setAuthToken, setSnackbarSettings } from "./../../actions";
import "./Style.css";
import { useState } from "react";

const styles = (theme) => ({
  paper: {
    // marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    height: "400px",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

function SignIn(props) {
  const { classes } = props;
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLoginClick = (event) => {
    event.preventDefault(); // Prevent default form submission

    const { email, password } = form;
    const { setSnackbarSettings } = props;

    LocalApi.post("/api/signin", { email, password })
      .then((response) => {
        props.setAuthToken(response.data.token);
        // this.props.history.push("/admin/dashboard");
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

  return (
    <>
      <div className="mainDiv">
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <form className={classes.form} onSubmit={handleLoginClick}>
            {/* Use Fields from Redux Form */}
            <Field
              type="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={form.email}
              component={ReduxTextField}
              margin="normal"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Field
              type="password"
              label="Password"
              name="password"
              value={form.password}
              autoComplete="password"
              component={ReduxTextField}
              margin="normal"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log In
            </Button>
          </form>
        </Paper>
      </div>
    </>
  );
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

const WrappedLoginForm = reduxForm({
  form1: "SignIn",
  validate,
})(SignIn);

export default connect(
  null,
  {
    setAuthToken,
    setSnackbarSettings,
  }
)(withStyles(styles)(withRouter(SignIn)));
