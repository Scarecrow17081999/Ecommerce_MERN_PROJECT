import ProductModel from "../models/productModels.js";
import ApiFeatures from "../utils/apiFeatures.js";
import ErrorHandler from "../utils/errorHandler.js";

import cloudinary from "cloudinary";

//CREATE PRODUCT//Admin
export const createProduct = async (req, res, next) => {
  try {
    let images = [];
    if (typeof req.body.images == "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    const imagesLink = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
      console.log(result);
      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.CreatedByuser = req.user.id;
    req.body.images = imagesLink;
    const data = await ProductModel.create(req.body);

    res.status(201).json({ success: true, data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error,
    });
    console.log(error);
  }
};

//UPDATE PRODUCT //Admin
export const updateProduct = async (req, res, next) => {
  try {
    //FIND THE DATA
    let data = await ProductModel.findById(req.params.id);
    const body = await req.body;

    //CHECK IF THE DATA EXISTS
    if (!Boolean(Object.keys(req.body).length)) {
      return next(new ErrorHandler("Please enter a valid field", 404));
    }

    if (!data) {
      return next(new ErrorHandler("Product not found", 404));
    }

    //IMAGESS START HERE//

    let images = [];
    if (typeof req.body.images == "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    if (images != undefined) {
      //delete image from cloudinary //
      for (let i = 0; i < data.images.length; i++) {
        await cloudinary.v2.uploader.destroy(data.images[i].public_id);
      }
    }
    const imagesLink = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
      console.log(result);
      imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLink;

    //UPDATE THE DATA
    data = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    //SEND THE RESPONSE
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "something went wrong",
      error,
    });
  }
};
//DELETE PRODUCT //Admin
export const deleteProduct = async (req, res, next) => {
  try {
    const data = await ProductModel.findByIdAndDelete(req.params.id);
    if (!data) {
      return next(new ErrorHandler("Product not found", 404));
    }

    //Delete product in cloudinary//

    for (let i = 0; i < data.images.length; i++) {
      await cloudinary.v2.uploader.destroy(data.images[i].public_id);
    }

    res
      .status(200)
      .json({ success: true, message: "product deleted succssfully", data });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error,
    });
    console.log(error);
  }
};

//GET SINGLE PRODUCT //Admin

export const getSingleProduct = async (req, res, next) => {
  try {
    const data = await ProductModel.findById(req.params.id);

    if (!data) {
      return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong",
      error,
    });
    console.log(error);
  }
};
//user route ///GETTING ALL PRODUCTS
export const getAllProducts = async (req, res, next) => {
  try {
    //pagination//
    const resultPerPage = 8;
    /////////////////
    const productCount = await ProductModel.countDocuments();
    const apiFeature = new ApiFeatures(ProductModel.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);

    let data = await apiFeature.query;

    let filteredProductsCount = data.length;
    if (!data) {
      return next(new ErrorHandler("No products in database", 404));
    }
    res.status(200).json({
      success: true,
      data,
      productCount,
      resultPerPage,
      filteredProductsCount,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Internal server error", 500));
  }
};
//user route ///GETTING ALL PRODUCTS ADMIN//
export const getAdminProducts = async (req, res, next) => {
  try {
    const data = await ProductModel.find();
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Internal server error", 500));
  }
};
