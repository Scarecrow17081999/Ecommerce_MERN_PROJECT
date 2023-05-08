import app from "./app.js";
import dotenv from "dotenv";
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
