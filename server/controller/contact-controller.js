const { ContactService } = require("../services/index");
const { StatusCodes } = require("http-status-codes");
const contactService = new ContactService();

const create = async (req, res) => {
  try {
    const response = await contactService.create(req.body);
    return res.status(StatusCodes.OK).json({
      message: "Successfully completed booking",
      success: true,
      error: {},
      data: response,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
      err: error.explanation,
      data: {},
    });
  }
};

module.exports = { create };
