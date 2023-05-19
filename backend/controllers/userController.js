import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/userModel.js";
import sentToken from "../utils/jwttoken.js";
import ProductModel from "../models/productModels.js";
import cloudinary from "cloudinary";
import sendMail from "../utils/sendMail.js";

// REGISTER USER//

export const registerUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 1000,
      crop: "scale",
    });

    const user = await User.create({
      name,
      email,
      password,
      avatar: { public_id: myCloud.public_id, url: myCloud.secure_url },
    });

    sentToken(user, 201, res, "User Registeration Successful", next);
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error, 500));
  }
};
//LOGIN USER//

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please enter email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    sentToken(user, 200, res, "User Logged In Successfully", next);
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};

//LOGOUT USER//

export const logout = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return next(new ErrorHandler("Logout failed please try again", 500));
  }
};
//FORGOT PASSWORD//

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(new ErrorHandler("Please enter your email", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("User Not Found", 404));
  }
  // get resetpassword token
  const resetToken = await user.generateResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it`;
  try {
    await sendMail({
      to: user.email,
      subject: "Password Reset",
      text: message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    console.log(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new ErrorHandler("Password recovery failed please try again", 500)
    );
  }
};

//GET USER DETAIL//

export const getUserDetail = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new ErrorHandler("User Not Found", 404));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};
//UPDATE USER PASSWORD//

export const updateUserPassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");
    if (!user) {
      return next(new ErrorHandler("User Not Found", 404));
    }

    const isPasswordCorrect = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordCorrect) {
      return next(new ErrorHandler("Old password dosen't match", 400));
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(
        new ErrorHandler("Password fields dosen't match please try again", 400)
      );
    }

    user.password = req.body.newPassword;
    await user.save({ validateBeforeSave: false });

    await sentToken(user, 200, res, "Password Updated Successfully");

    res.status(200).json({
      success: true,
      message: "password changed successfully",
      user,
    });
    console.log("lol");
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error, 500));
  }
};

//UPDATE USER//

export const updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return next(new ErrorHandler("Please enter name and email", 400));
    }
    const updateDetails = {
      name,
      email,
    };

    if (req.body.avatar != "") {
      const user = await User.findByIdAndUpdate(req.user.id);
      const imageId = user.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 1000,
        crop: "scale",
      });
      updateDetails.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
    console.log(name, email);
    const user = await User.findByIdAndUpdate(req.user.id, updateDetails, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    console.log(user);
    if (!user) {
      return next(new ErrorHandler("User Not Found", 404));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error, 500));
  }
};

//GET ALL USERS // admin

export const getAllUsersAdmin = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users) {
      return next(new ErrorHandler("No Users Found", 404));
    }
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    return next(new new ErrorHandler(error, 500)());
  }
};

//GET SINGLE USER DETAIL ADMIN//

export const getUserDetailAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(
        new ErrorHandler(`User not found with id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error, 500));
  }
};

//UPDATE USER DETAIL ADMIN//

export const updateUserRoleByAdmin = async (req, res, next) => {
  try {
    const userDetails = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
    const user = await User.findByIdAndUpdate(req.params.id, userDetails, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    if (!user) {
      return next(
        new ErrorHandler(`User not found with id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error, 500));
  }
};

//DELETE USER DETAIL ADMIN//

export const deleteUserByAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(
        new ErrorHandler(`User not found with id ${req.params.id}`, 404)
      );
    }

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    await user.deleteOne();
    res.status(200).json({
      success: true,
      user,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error, 500));
  }
};

//CREATE PRODUCT REVIEW//

export const createProductReview = async (req, res, next) => {
  try {
    const { rating, comment, productId } = req.body;

    const productReview = {
      user: String(req.user._id),
      name: req.user.name,
      rating: Number(rating),
      comment,
    };
    console.log(String(req.user._id));
    const product = await ProductModel.findById(productId);

    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }
    const isReviewed = await product.reviews.find((review) => {
      console.log(review);
      return String(review.user) == String(req.user._id);
    });
    if (false) {
      // product.reviews.forEach((review) => {
      //   if (review.user.toString() == req.user._id.toString()) {
      //     review.rating = Number(rating);
      //     review.comment = comment;
      //   }
      // });
    } else {
      product.reviews.push(productReview);
      product.numOfReviews = product.reviews.length;
    }

    ///AVERAGE REVIEWS////
    let average = 0;
    product.reviews.forEach((e) => {
      average += Number(e.rating);
    });
    product.ratings = average / product.reviews.length;

    await product.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
      message: "Product Reviewed Successfully",
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error, 500));
  }
};

//GET ALL REVIEWS OF A PRODUCT//

export const getAllReviewsOfProduct = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return next(
        new ErrorHandler(`Product Not Found with id ${req.params.id}`, 404)
      );
    }
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {
    // console.log(error);
    return next(new ErrorHandler(error, 500));
  }
};

//DELETE PRODUCT REVIEW//

export const deleteProductReview = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.query.productId);

    if (!product) {
      return next(
        new ErrorHandler(`Product Not Found with id ${req.query.id}`, 404)
      );
    }
    const reviews = product.reviews.filter((review) => {
      return review._id.toString() != req.query.id.toString();
    });
    let average = 0;
    reviews.forEach((e) => {
      average += Number(e.rating);
    });

    let ratings = average / reviews.length;
    let numOfReviews = reviews.length;

    if (reviews.length === 0) {
      ratings = 0;
      numOfReviews = 0;
    }
    await ProductModel.findByIdAndUpdate(
      { _id: req.query.productId },
      {
        reviews: reviews,
        ratings: Number(ratings),
        numOfReviews,
      },
      { new: true, runValidators: true, useFindAndModify: false }
    );

    res.status(200).json({
      success: true,
      message: "Product Review Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error, 500));
  }
};
