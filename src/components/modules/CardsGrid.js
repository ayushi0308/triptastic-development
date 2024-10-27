import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { getTours } from "./../../actions";
import TourCard from "./TourCard";
import QuoteDetailsDialog from "./../forms/QuoteDetailsDialog";

const styles = (theme) => ({
  cardsContainer: {
    width: "auto",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
  },
});

class CardsGrid extends Component {
  componentDidMount() {
    const { getTours, query } = this.props;
    // getTours(query);
  }

  render() {
    const { tours, classes, flights } = this.props;
    return (
      <div className={classes.cardsContainer}>
        {/* <QuoteDetailsDialog /> */}
        <Grid container spacing={50} style={{
          margin: 10
        }}>
          {flights.map((tour) => (
            <Grid item key={tour.id} sm={6} md={4} lg={3}>
              <TourCard {...tour} />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log("Card Grid");
  // console.log(state);
  // console.log("------");
  return {
    tours: state.tours.tours,
    flights: state.airport.flights,
  };
};

export default connect(
  mapStateToProps,
  { getTours }
)(withStyles(styles)(CardsGrid));
