const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
  productName: { type: String, require: true },
  providerName: { type: String, require: true },
  purchaseValue: { type: Number, require: true, min: 0 },
  saleValue: { type: Number, require: true, min: 0 },
  quantityStock: { type: Number, require: true, min: 0 },
  boxedUnits: { type: Number, require: true, min: 0 },
  purchaseDate: { type: String, require: true },
  dueDate: { type: String, require: true },
});

const Products = mongoose.model("Products", ProductsSchema);

module.exports = Products;
