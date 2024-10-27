import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import LocalPhone from "@material-ui/icons/LocalPhone";
import {
  setMenuDrawerOpen,
  setAuthToken,
  getAccessToken,
  setFlights,
} from "./../../actions";
import "./Styles.css";
import { MenuItems } from "./MenuItems";
import { useState } from "react";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const styles = (theme) => ({
  logo: {
    flexGrow: 1,
    textDecoration: "none",
    [theme.breakpoints.down(375)]: {
      fontSize: "1rem",
    },
  },
  menuButton: {
    marginLeft: -14,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  secondaryBar: {
    background: "#fff",
    minHeight: "30px",
  },
  label: {
    fontSize: "1.25rem",
  },
  contactButton: {
    fontSize: "1.25rem",
    padding: 0,
    [theme.breakpoints.down(375)]: {
      fontSize: "1rem",
    },
  },
});

class NavBar extends Component {
  state = {
    decodedToken: null,
  };
  logout = () => {
    this.props.setAuthToken(null);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.token == this.props.token) {
      const { token } = this.props;
      if (token) {
        const decodedToken = jwtDecode(token);
        this.setState({ decodedToken });
      } else {
      }
    }
  }

  render() {
    const { classes, setMenuDrawerOpen, token, decodedToken } = this.props;
    const num = 1;
    return (
      <>
        <Hidden smDown>
          <nav className="NavbarItems">
            <ul className="nav-menu">
              {MenuItems.filter(
                (item) =>
                  (!item.isPrivate || token) &&
                  (!item.isAdmin ||
                    (token && jwtDecode(token).role === "Admin"))
              ).map((item, index) => {
                if (item.title === "Login" && token) {
                  return null;
                }
                return (
                  <li key={index}>
                    <Link className={item.cName} to={item.url}>
                      <i className={item.icon} />
                      {item.title}
                    </Link>
                  </li>
                );
              })}
              {/* <Link
                  id="nav-link"
                  className="nav-link"
                  component={Link}
                  to="/"
                >
                  Home
                </Link>

                <Link
                  id="nav-link"
                  className="nav-link"
                  component={Link}
                  to="/tours"
                >
                  Tour Packages
                </Link>

                <Link
                  id="nav-link"
                  className="nav-link"
                  component={Link}
                  to="/about"
                >
                  About Us
                </Link>

                <Link
                  id="nav-link"
                  className="nav-link"
                  component={Link}
                  to="/contact"
                >
                  Contact Us
                </Link>

                {token ? (
                  <>
                    <Link
                      id="nav-link"
                      className="nav-link"
                      component={Link}
                      to="/admin/dashboard"
                    >
                      Dashboard
                    </Link>

                    <Link
                      id="nav-link"
                      className="nav-link"
                      onClick={this.logout}
                    >
                      Logout
                    </Link>
                  </>
                ) : (
                  <Link
                    id="nav-link"
                    className="nav-link"
                    component={Link}
                    to="/login"
                  >
                    Login
                  </Link>
                )} */}
              {token ? (
                <li>
                  <Link
                    id="nav-link"
                    className="nav-links"
                    onClick={this.logout}
                    to="/"
                  >
                    Logout
                  </Link>
                </li>
              ) : (
                <></>
              )}
            </ul>
            <h1 className="navbar-logo">TripTastic</h1>

            {token ? (
              <h3 className="navbar-item">
                <span>User: </span> {jwtDecode(token).email.toString()}{" "}
              </h3>
            ) : (
              <></>
            )}
          </nav>
        </Hidden>
      </>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

export default connect(
  mapStateToProps,
  { setMenuDrawerOpen, setAuthToken, getAccessToken, setFlights }
)(withStyles(styles)(NavBar));
