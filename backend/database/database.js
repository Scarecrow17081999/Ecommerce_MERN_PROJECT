import mongoose from "mongoose";
const db = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/EcommerceData";
//connect to database
const database = mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((e) => {
    console.log(`Connected to database ${e.connection.host}`);
  });

export default database;
