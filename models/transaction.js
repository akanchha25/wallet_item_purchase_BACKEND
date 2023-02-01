const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  walletId: { type: String, required: true },
  balance: { type: Number },
  transactionId: { type: String, required: true },
  description: { type: String },
  type: {},
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", TransactionSchema);
