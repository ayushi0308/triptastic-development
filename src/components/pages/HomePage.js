import React, { Component } from "react";
import CardsGrid from "../modules/CardsGrid";
import HeroImage from "./../modules/HeroImage";
import { connect } from "react-redux";
import MiddleBanner from "./../modules/MiddleBanner";
import QuoteFormTabs from "./../modules/QuoteFormTabs";
import { withStyles } from "@material-ui/core";

const styles = (theme) => ({
  pageContentWrapper: {
    minHeight: "calc(100vh - 154px)",
    [theme.breakpoints.up(405)]: {
      minHeight: "calc(100vh - 130px)",
    },
    [theme.breakpoints.up(600)]: {
      minHeight: "calc(100vh - 138px)",
    },
    [theme.breakpoints.up(960)]: {
      minHeight: "calc(100vh - 174px)",
    },
  },
});

class HomePage extends Component {
  render() {
    const { classes, flights } = this.props;
    console.log(flights);
    return (
      <div className={classes.pageContentWrapper}>
        <HeroImage imageLink={"./londonEye.jpg"} height={"740px"}>
          <QuoteFormTabs />
        </HeroImage>
        {flights && flights.length > 0 && (
          <>
            <MiddleBanner />
            <CardsGrid query={{ featured: true }} />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tours: state.tours.tours,
    flights: state.airport.flights,
  };
};

export default connect(mapStateToProps)(withStyles(styles)(HomePage));
