import express from "express";
export const app = express();
import cookieParser from "cookie-parser";
import { err } from "./middleware/error.js";
//route import
import productsRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoute.js";
import orderRoute from "./routes/orderRoute.js";

//using middlewares

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", productsRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);
//middleware for errors

app.use(err);

export default app;
