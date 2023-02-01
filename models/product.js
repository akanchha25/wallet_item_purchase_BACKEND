const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    amount:{type: Number, required: true},
    description:{type: String}
})

module.exports = mongoose.model("Product", ProductSchema);
