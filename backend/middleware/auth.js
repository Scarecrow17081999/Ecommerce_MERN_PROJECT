import ErrorHandler from "../utils/errorHandler.js";
import Jwt from "jsonwebtoken";
import User from "../models/userModel.js";
export const isAuthenticatedUser = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return next(
        new ErrorHandler("Please Login to access this resourse", 401)
      );
    }

    const decoded = await Jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Internal Server Error", 500));
  }
};

export const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`Unauthorized Access your are ${req.user.role}`, 403)
      );
    }
    next();
  };
};
