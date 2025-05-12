const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema({
  productName: { type: String, require: true },
  makerName: { type: String, require: true },
  providerName: { type: String, require: true },
  purchaseValue: { type: Number, require: true, min: 0 },
  percentage: { type: Number, require: true, min: 0 },
  saleValue: { type: Number, require: true, min: 0 },
  quantityStock: { type: Number, require: true, min: 0 },
  typePackaging: { type: String, require: true },
  units: { type: Number, require: true, min: 0 },
  unitQuantity: { type: Number, min: 0 },
  unitValue: { type: Number, min: 0 },
  modified: { type: Date, require: true },
  userModified: { type: String, require: true },
});

const Products = mongoose.model("Products", ProductsSchema);

module.exports = Products;
