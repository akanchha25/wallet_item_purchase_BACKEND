const mongoose = require('mongoose');

const ProductTransactionSchema = new mongoose.Schema({
    walletId: { type: String, required: true },
    balance: { type: Number },
    transactionId: { type: String, required: true },
    description: { type: String },
    type: {},
    productId: {type: String},
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('ProductTransaction', ProductTransactionSchema);