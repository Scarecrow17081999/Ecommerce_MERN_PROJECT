import ErrorHandler from "../utils/errorHandler.js";

export const err = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Something went wrong";

  //wrong mongodb id error or cast error
  // if (err.name === "CastError") {
  //   const message = `Invalid id ${err.path}`;
  //   err = new ErrorHandler(message, 400);
  // }
  // if ((err.code = "E11000")) {
  //   const message = `Invalid credential, Please try again`;
  //   err = new ErrorHandler(message, 400);
  // }
  // if ((err.name = "jsonWebTokenError")) {
  //   const message = `Invalid token, Please try again`;
  //   err = new ErrorHandler(message, 400);
  // }
  // if ((err.name = "TokenExpiredError")) {
  //   const message = `Token expired, Please try again`;
  //   err = new ErrorHandler(message, 400);
  // }
  res.status(err.statusCode).json({
    error: err,
    message: err.message,
    success: false,
  });
};
