const UserService = require("../services/user-service");

const userService = new UserService();

const validateUserAuth = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      success: false,
      data: {},
      message: "Something went wrong",
      err: "Email or password missing in the request",
    });
  }
  next();
};

const validateIsAdminRequest = (req, res, next) => {
  if (!req.body.id) {
    return res.status(400).json({
      success: false,
      data: {},
      err: "User id not given",
      message: "Something went wrong",
    });
  }
  next();
};

const isAuthenticated = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log("Inside Authentication Middleware");
  // console.log(token);
  console.log("-------------------------------");
  if (!token) {
    return res.status(401).json({ message: "Missing token" });
   }
  try {
    const decodedToken = await userService.verifyToken(token);
    console.log(decodedToken);
    console.log("-----------------------");
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {
  validateUserAuth,
  validateIsAdminRequest,
  isAuthenticated,
};
