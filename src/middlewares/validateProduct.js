exports.validateProductFields = (req, res, next) => {
  if (Object.keys(req.body).length <= 0)
    return res.status(400).json({ error: "No information received." });

  for (let value of Object.values(req.body)) {
    if (!value)
      return res.status(400).json({ error: "All fields must be filled in" });
  }

  next();
};

exports.validateData = (req, res, next) => {
  const product = req.body;
  const invalidFields = [];

  if (typeof product.productName !== "string")
    invalidFields.push("Product Name must be text type");

  if (typeof product.providerName !== "string")
    invalidFields.push("Provider Name must be text type");

  if (typeof product.makerName !== "string")
    invalidFields.push("Maker Name must be text type");

  if (typeof product.purchaseValue !== "number" || product.purchaseValue <= 0)
    invalidFields.push(
      "The purchase price must be numeric and greater than zero"
    );

  if (typeof product.saleValue !== "number" || product.saleValue <= 0)
    invalidFields.push("The sale price must be numeric and greater than zero");

  if (
    typeof product.quantityStock !== "number" ||
    !Number.isInteger(product.quantityStock)
  )
    invalidFields.push("Stock must be numeric, greater than zero and integer");

  if (
    typeof product.units !== "number" ||
    product.units <= 0 ||
    !Number.isInteger(product.units)
  )
    invalidFields.push("Units must be numeric, greater than zero and integer");

  if (
    typeof product.percentage !== "number" ||
    !Number.isInteger(product.percentage) ||
    product.percentage <= 0
  )
    invalidFields.push(
      "Percentage must be numeric, greater than zero and integer"
    );

  if (invalidFields.length > 0)
    return res.status(400).json({ error: `${invalidFields.join(",  ")}` });

  next();
};
