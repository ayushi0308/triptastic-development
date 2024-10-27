const UserService = require("../services/user-service");

const userService = new UserService();

const getAccessToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Missing token" });
  }
  try {
    const decodedToken = await userService.verifyToken(token);
    console.log(decodedToken);
    console.log("-----------------------");
    return token;
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = getAccessToken;
