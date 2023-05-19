import Order from "../models/orderModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import ProductModel from "../models/productModels.js";

//CREATE ORDER//
export const createOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentInfo,
    } = req.body;

    const order = await Order.create({
      user: req.user._id,
      shippingInfo,
      orderItems,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paymentInfo,
      paidAt: new Date(Date.now()),
    });
    res.status(201).json({ success: true, order });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};
//GET SINGLE ORDER//
export const getSingleOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ _id: req.params.id }).populate(
      "user",
      "name email"
    );

    if (!orders) {
      return next(
        new ErrorHandler(`No orders found for id:${req.params.id}`, 404)
      );
    }

    res.status(200).json({ success: true, orders });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
};

//GET USER ORDERS//

export const getUserOrders = async (req, res, next) => {
  console.log(req.user);
  try {
    const orders = await Order.find({ user: req.user._id.toString() });
    if (!orders) {
      return next(
        new ErrorHandler(
          `No orders found for id:${req.user._id.toString()}`,
          404
        )
      );
    }
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error, 500));
  }
};

//GET ALLL ORDERS//
export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({});

    if (!orders) {
      return next(new ErrorHandler(`No orders Found`, 404));
    }

    let totalPrice = 0;

    orders.forEach((order) => {
      totalPrice += order.totalPrice;
    });

    res.status(200).json({ success: true, orders, totalPrice });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error, 500));
  }
};
//UPDATE ORDER STATUS//
export const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.find(req.params.id);
    if (!order) {
      return next(new ErrorHandler(`No orders Found`, 404));
    }
    if (order.status === "Delivered") {
      return next(new ErrorHandler(`Order is already Delivered`, 400));
    }
    order.orderItems.forEach(async (orderItem) => {
      await updateStock(orderItem.Product, orderItem.quantity);
    });

    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
      order.paidAt = new Date(Date.now());
    }

    await order.save();

    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error, 500));
  }
};

async function updateStock(id, quantity) {
  const product = await ProductModel.findById(id);
  if (!product) {
    return;
  }
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

//DELETE ORDERS//

export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(
        new ErrorHandler(
          `No orders Foun
          Found`,
          404
        )
      );
    }
    await order.deleteOne();
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler(error, 500));
  }
};
