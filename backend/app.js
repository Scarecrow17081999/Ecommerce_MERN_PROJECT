import express from "express";
export const app = express();
import cookieParser from "cookie-parser";
import { err } from "./middleware/error.js";
import fileUpload from "express-fileupload";
import bodyParser from "body-parser";
import dotenv from "dotenv";
//route import
import productsRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";
import paymentRoute from "./routes/paymentRoute.js";

dotenv.config({
  path: "backend/config/config.env",
});
//using middlewares

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", productsRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);
app.use("/api/v1", paymentRoute);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
//middleware for errors

app.use(err);

export default app;
