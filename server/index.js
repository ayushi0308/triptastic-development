const express = require("express");
const bodyParser = require("body-parser");

const cors = require("cors");
const apiRoutes = require("./routes/index");

const setupAndStartServer = async () => {
  // create a express object
  const app = express();
  const PORT = 5000;

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cors());
  app.use("/api", apiRoutes);


  // http://localhost:5000/api/bookings
  app.listen(PORT, async () => {
    console.log(`Server started at ${PORT}`);
    // console.log();
  });
};
setupAndStartServer();
