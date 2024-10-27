const express = require("express");
const UserController = require("../controller/userController");
const FlightController = require("../controller/Flight-controller");
const BookingController = require("../controller/booking-controller");
const AirportController = require("../controller/airport-controller");
const ContactController = require("../controller/contact-controller");
const dotenv = require("dotenv").config();
const {
  AuthRequestValidator,
  FlightMiddleware,
} = require("../middlewares/index");
const { isAuthenticated } = require("../middlewares/auth-request-validator");

const router = express.Router();

router.get("/listen", async (re, res) => {
  res.send(dotenv);
});

// User Routes
router.post(
  "/signup",
  AuthRequestValidator.validateUserAuth,
  UserController.create
);

router.post(
  "/signin",
  AuthRequestValidator.validateUserAuth,
  UserController.signIn
);

router.get("/isAuthenticated", isAuthenticated, UserController.isAuthenticated);

router.get(
  "/isAdmin",
  isAuthenticated,
  AuthRequestValidator.validateIsAdminRequest,
  UserController.isAdmin
);

// FLight Routes
router.post("/searchFlight", FlightController.searchFlight);

router.post(
  "/flights",
  isAuthenticated,
  FlightMiddleware.validateCreateFlight,
  FlightController.create
);

router.get("/flights/:id", isAuthenticated, FlightController.get);

router.patch("/flights/:id", isAuthenticated, FlightController.update);
router.post(
  "/deleteFlight/:id",
  isAuthenticated,
  FlightController.deleteFlight
);

//Booking Routes

router.post("/bookings", isAuthenticated, BookingController.create);

router.post(
  "/deleteBooking/:id",
  isAuthenticated,
  BookingController.deleteBooking
);

router.get("/bookings", isAuthenticated, BookingController.getAll);
router.get("/refundStatus", isAuthenticated, BookingController.getRefundStatus);

// Airport Routes

router.get("/airports", AirportController.getAll);

// Contact Us Routes

router.post("/contactUs", ContactController.create);

module.exports = router;
