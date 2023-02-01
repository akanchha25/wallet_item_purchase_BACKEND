const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config();

const walletRoute = require("./routes/wallet");

// const Wallet = require("./models/wallet");
// const Transaction = require("./models/transaction");
// const Product = require("./models/product");

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB is connected Successfully!"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

app.use("/api/v1", walletRoute);



app.listen(4500, () => {
  console.log("Server is running!");
});
