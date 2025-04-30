const Products = require("../models/ProductsModel");

exports.getProducts = async (req, res) => {
  try {
    const products = await Products.find({
      $or: [
        { productName: { $regex: req.query.productName || "", $options: "i" } },
        {
          providerName: { $regex: req.query.providerName || "", $options: "i" },
        },
        {
          makerName: { $regex: req.query.makerName || "", $options: "i" },
        },
      ],
    });

    if (!products.length) {
      return res.status(404).json({ message: "No products found." });
    }

    res.status(200).json({
      message: "Products successfully recovered,",
      data: products,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const body = req.body;
    body.modified = Date.now();
    body.userModified = "user teste";

    const product = new Products(body);
    await product.save();

    res
      .status(201)
      .json({ status: "success", message: "Produto cadastrado com sucesso." });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: "Erro ao cadastrar produto.",
      error: error.message,
    });
  }
};

exports.updateProducts = async (req, res) => {
  try {
    const product = await Products.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product updated successfuly.", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ message: "Product deleted successfuly." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
