const Products = require("../models/ProductsModel");

exports.getProducts = async (req, res) => {
  try {
    const response = await Products.find();

    if (!response.length) {
      return res.status(404).json({ message: "No products found." });
    }

    res.status(200).json({
      message: "Products successfully recovered,",
      data: response,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = new Products(req.body);
    await product.save();

    res.status(201).json({ message: "Product registered successfully." });
  } catch (error) {
    res.status(400).json({
      message: "Error registering the product.",
      error: error.message,
    });
  }
};
