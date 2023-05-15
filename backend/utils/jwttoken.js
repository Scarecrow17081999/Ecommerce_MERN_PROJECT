//creating token and saving cookie

import ErrorHandler from "./errorHandler.js";

const sentToken = async (user, statusCode, res, message) => {
  try {
    const token = await user.generateAuthToken();

    //options for cookit
    const options = {
      httpOnly: true,
      expires: new Date(
        Date.now() + process.env.JWT_EXPIRATION_TIME * 24 * 60 * 60 * 1000
      ),
    };

    res.cookie("token", token, options).status(statusCode).json({
      message,
      user,
      token,
    });
    next();
  } catch (error) {
    return next(new ErrorHandler("Error while logging in", 400));
  }
};
export default sentToken;
