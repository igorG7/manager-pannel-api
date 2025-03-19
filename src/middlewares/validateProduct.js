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
    invalidFields.push("Invalid product name type");

  if (typeof product.providerName !== "string")
    invalidFields.push("Invalid provider name type");

  if (typeof product.purchaseValue !== "number" || product.purchaseValue <= 0)
    invalidFields.push("The purchase price must be numeric and greater than 0");

  if (typeof product.saleValue !== "number" || product.saleValue <= 0)
    invalidFields.push("The sale price must be numeric and greater than 0");

  if (typeof product.quantityStock !== "number" || product.quantityStock <= 0)
    invalidFields.push("Stock must be numeric and greater than zero");

  if (typeof product.boxesUnits !== "number" || product.boxesUnits <= 0)
    invalidFields.push("Boxes units must be numeric and greater than zero");

  if (typeof product.purchaseDate !== "string")
    invalidFields.push("Purchase date must be text type");

  if (typeof product.dueDate !== "string")
    invalidFields.push("Due date must be text type");

  if (invalidFields.length > 0)
    return res.status(400).json({ error: `${invalidFields.join(",  ")}` });

  next();
};
