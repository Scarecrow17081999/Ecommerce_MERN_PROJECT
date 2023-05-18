import ErrorHandler from "../utils/errorHandler.js";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_API_SECRET_KEY);
// console.log(process.env.STRIPE_API_KEY, `lololo`);

// console.log(`----------------------`);
// console.log(process.env.STRIPE_API_SECRET_KEY);

// console.log(`----------------------`);
const processPayment = async (req, res, next) => {
  try {
    if (!req.body.amount) {
      return next(new Error("Please provide amount", 404));
    }
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "myCompany",
      },
    });

    res
      .status(200)
      .json({ success: true, client_secret: myPayment.client_secret });
  } catch (error) {
    return next(new Error(error, 404));
  }
};

export const sendStripeApiKey = (req, res, next) => {
  res
    .status(200)
    .json({
      success: true,
      stripeApiKey: process.env.STRIPE_API_KEY,
      secretkey: process.env.STRIPE_API_SECRET_KEY,
    });
};

export default processPayment;
