import React, { Component } from "react";
import HeroImage from "./../modules/HeroImage";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

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

class AboutUsPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.pageContentWrapper}>
        <HeroImage imageLink="./londonEye.jpg" height={"40vh"} />
        <div className={classes.aboutUsWrapper}>
          <Typography variant="h2" className={classes.titleText} gutterBottom>
            About Us
          </Typography>

          <Paper className={classes.paperWrapper}>
            <div>
              <img
                src="./About.png"
                alt="Deepak Sharma's"
                className={classes.photo}
              />
            </div>
            <div className={classes.content}>
              <Typography variant="body1" gutterBottom>
                Welcome to our world at Node Express MySQL React (NEMR) Travel!
                We are passionate about leveraging cutting-edge technology to
                revolutionize the travel experience for our clients. At NEMR
                Travel, we combine the power of Node.js, Express.js, MySQL, and
                React.js to create seamless, efficient, and user-friendly
                platforms for all your travel needs. Our team of skilled
                developers and travel enthusiasts is dedicated to crafting
                innovative solutions that make booking and managing your trips a
                breeze. Whether you're planning a family vacation, an
                adventurous solo journey, or a romantic getaway, NEMR Travel is
                here to cater to your every need. Our robust backend powered by
                Node.js and Express.js ensures lightning-fast performance and
                secure transactions, while our front-end built with React.js
                provides an intuitive and engaging user interface.
                <br />
                <span style={{ fontSize: "larger", color: "#000" }}>
                  <b> A007 : RAHUL CHOUDHARI</b>
                  <br />
                  <b> A012 : AYUSHI DHAMANE</b>
                  <br />
                  <b> A014 : AAYUSH DOSHI</b>
                </span>{" "}
              </Typography>
              <p />
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AboutUsPage);
