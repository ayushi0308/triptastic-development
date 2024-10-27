import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { setQuote, setQuoteDetailsDialogOpen } from "./../../actions";
import FlightBookingDialog from "./FlightBookingDialog";
import { jwtDecode } from "jwt-decode";

const styles = (theme) => ({
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    paddingBottom: 8,
  },
  cardActions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
});

class TourCard extends Component {
  state = {
    dialogOpen: false,
    userId: 0,
  };
  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };
  onCardClick = () => {
    // const { _id } = this.props;
    // this.props.history.push(`/tours/${_id}`);
  };

  onQuoteClick = (event) => {
    const { title, summary, setQuote, setQuoteDetailsDialogOpen } = this.props;
    // setQuote({
    //   type: "Holiday",
    //   destination: title,
    //   client_comments: `REQUESTING TOUR PACKAGE\nTitle: ${title}\nSummary: ${summary}`,
    //   adults: 1,
    //   children: 0,
    //   budget: "affordable",
    // });
    // setQuoteDetailsDialogOpen(true);
    this.handleDialogOpen();

    event.stopPropagation();
  };

  render() {
    const {
      classes,
      arrivalAirtportId,
      departureAirportId,
      summary,
      image,
      price,
      id,
      arrivalTime,
      departureTime,
      boardingGate,
      totalSeats,
      airportName,
      authToken,
    } = this.props;
    const { dialogOpen, userId } = this.state;

    console.log(this.props);
    function formatDateTime(dateTimeString) {
      const dateTime = new Date(dateTimeString);
      const day = dateTime.getDate();
      const month = dateTime.getMonth() + 1;
      const year = dateTime.getFullYear();
      const hours = dateTime.getHours();
      const minutes = dateTime.getMinutes();
      const seconds = dateTime.getSeconds();
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }

    const formattedArrivalTime = formatDateTime(arrivalTime);
    const formattedDepartureTime = formatDateTime(departureTime);

    const findAirportName = (airportId) => {
      const airport = airportName.find((item) => item.id === airportId);
      return airport ? airport.name : "Airport Not Found";
    };

    const getTitle = () => {
      var title = findAirportName(departureAirportId) + "-";
      findAirportName(arrivalAirtportId);
      return title;
    };

    if (authToken) {
      var token = this.props.authToken;
      var decodedToken = jwtDecode(token);
      console.log("UserId", decodedToken.id);
      var user = decodedToken.id;
    }
    return (
      <>
        <Card className={classes.card}>
          <CardActionArea onClick={this.onCardClick}>
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {findAirportName(departureAirportId)} -{" "}
                {findAirportName(arrivalAirtportId)}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2" />
              <Typography variant="body1" gutterBottom>
                {summary}
              </Typography>
              <Typography variant="subtitle2">
                Starting from ₹ {price}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Arrival Time: {formattedArrivalTime}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Departure Time: {formattedDepartureTime}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Boarding Gate: {boardingGate}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Total Seats: {totalSeats}
              </Typography>
            </CardContent>
          </CardActionArea>
          {authToken ? (
            <CardActions className={classes.cardActions}>
              <Button
                size="small"
                color="secondary"
                variant="outlined"
                onClick={this.onQuoteClick}
              >
                Book Flight
              </Button>
            </CardActions>
          ) : (
            <h4> Kindly Login to Book the Ticket</h4>
          )}
        </Card>
        <FlightBookingDialog
          open={dialogOpen}
          handleClose={this.handleDialogClose}
          title={getTitle()}
          user={user ? user : 0}
          {...this.props}
        />
      </>
    );
  }
}

TourCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    tours: state.tours.tours,
    airportName: state.airport.airports,
    authToken: state.auth.token,
  };
};

export default connect(
  mapStateToProps,
  { setQuote, setQuoteDetailsDialogOpen }
)(withStyles(styles)(withRouter(TourCard)));
