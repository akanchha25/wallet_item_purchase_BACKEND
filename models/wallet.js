const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
  balance: { type: Number, required: true },
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
  transactionId : {type: String}
});

module.exports = mongoose.model("Wallet", WalletSchema);
