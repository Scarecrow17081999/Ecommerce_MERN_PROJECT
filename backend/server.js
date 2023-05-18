import app from "./app.js";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
dotenv.config({
  path: "backend/config/config.env",
});
///setting up the port
const port = process.env.PORT;
//connecting to the server

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//uncaught error exception

process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
  console.log("shutting down the server because of uncaught Exception error");
  server.close(() => {
    console.log("server closed");
    process.exit(1);
  });
});

//connecting to database
import database from "./database/database.js";
// cloudinay config
console.log("cloudinary config");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  // secure: true,
});

// unhandled promise rejection
process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  console.log(
    "shutting down the server because of unhandled promise rejection"
  );

  server.close(() => {
    console.log("server closed");
    process.exit(1);
  });
});
