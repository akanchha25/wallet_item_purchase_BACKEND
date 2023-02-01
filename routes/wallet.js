const express = require("express");
const wallet = require("../models/wallet");
const router = express.Router();
const Wallet = require("../models/wallet");
const { v4: uuidv4 } = require("uuid");
const Transaction = require("../models/transaction");
const Product = require("../models/product");
const transaction = require("../models/transaction");
const ProductTransaction = require("../models/productTransaction");

router.post("/wallet", async (req, res) => {
  const transactionId = uuidv4();
  const wallet = new Wallet({
    balance: req.body.balance,
    name: req.body.name,
    transactionId: transactionId,
  });
  try {
    const savedWallet = await wallet.save();
    res.status(200).json(savedWallet);
  } catch (err) {
    res.status(500), json(err);
  }
});

router.get("/wallet/:id", async (req, res) => {
  const walletId = req.params.id;
  var walletDetails = await wallet.findById(walletId);
  // console.log(walletDetails.balance)
  res.status(200).json({
    walletId: walletDetails._id,
    balance: walletDetails.balance,
    name: walletDetails.name,
    createdAt: walletDetails.date,
  });
});

router.post("/wallet/:id/transaction", async (req, res) => {
  const walletId = req.params.id;
  const transactionId = uuidv4();
  var walletDetails = await wallet.findById(walletId);
  const transaction = new Transaction({
    walletId,
    transactionId,
    balance: req.body.balance,
    description: req.body.description,
    type: req.body.type,
  });
  var date = new Date();
  var newBalance = walletDetails.balance + transaction.balance;
  await wallet
    .findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          balance: newBalance,
        },
      }
      // (err) => {
      //   res.status(500).json();
      // }
    )
    .clone();
  // console.log(newBalance);
  try {
    const savedTransaction = await transaction.save();
    res.status(200).json({
      balance: newBalance,
      transactionId: transactionId,
      description: transaction.description,
      type: "credit",
      createdAt: date,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/wallets/:id/transaction", async(req, res)=>{
  var walletId = req.params.id;
  const transactionsDetail = await transaction.find({
    walletId: walletId,
  });
  res.json(transactionsDetail)

})

router.post("/addProducts", async (req, res) => {
  const newProducts = new Product({
    amount: req.body.amount,
    description: req.body.description,
  });
  try {
    const savedProducts = await newProducts.save();
    res.status(200).json(savedProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/products", async (req, res) => {

  const page = parseInt(req.query.page) || 10;
  const limit = parseInt(req.query.limit) || 1;

  const allProduct = await Product.find()
  .skip((page - 1) * limit)
  .limit(limit);

  res.status(200).json(allProduct);
});

router.post("/wallet/:id/purchase", async (req, res) => {
  var walletId = req.params.id;
  var productId = req.body.productId;
  var walletDetails = await wallet.findById(walletId);
  var productDetail = await Product.findById(productId);
  // console.log(productDetail);
  const transactionId = uuidv4();
  const type = "debit";
  const productDescription = productDetail.description;
  const productAmount = productDetail.amount;
  var newBalance = walletDetails.balance - productAmount;
  await wallet
    .findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          balance: newBalance,
        },
      }
      // (err) => {
      //   res.status(500).json();
      // }
    )
    .clone();
  const transaction = new ProductTransaction({
    walletId,
    transactionId,
    balance: productAmount,
    description: productDescription,
    type: type,
    productId: productId,
  });
  const savedTransaction = await transaction.save();
  res.status(200).json({
    balance: newBalance,
    transactionId: transactionId,
    description: productDescription,
    type: "debit",
    productId: productId,
  });
});

router.get("/getProductDetailById/:id", async (req, res) => {
  const productId = req.params.id;
  const productDetail = await Product.findById(productId);
  res.json(productDetail);
});

router.get("/wallet/:id/transaction", async (req, res) => {
  const walletId = req.params.id;
  const transactionsDetail = await ProductTransaction.find({
    walletId: walletId,
  });
  // console.log(transactionsDetail)
  let TransactionsDetails = [];
  for (transactionDetail of transactionsDetail) {
    // console.log(transactionDetail);
    let listItemsObj = {
      balance: transactionDetail.balance,
      transactionId: transactionDetail.transactionId,
      description: transactionDetail.description,
      productId: transactionDetail.productId,
      type: "credit",
      createdAt: transactionDetail.createdAt,
    };
    TransactionsDetails.push(listItemsObj);
    // console.log(listItems);
  }
  res.json({
    TransactionsDetails,
  });
});

module.exports = router;
