exports.validateProductFields = (req, res, next) => {
  if (Object.keys(req.body).length <= 0)
    return res
      .status(400)
      .json({ status: "error", message: "Nenhuma informação foi recebida." });

  for (let value of Object.values(req.body)) {
    if (!value && value !== 0)
      return res
        .status(400)
        .json({ error: "Valores inválidos ou campos vazios." });
  }

  next();
};

exports.validateData = (req, res, next) => {
  const product = req.body;

  if (typeof product.productName !== "string")
    error(res, "'Nome do produto' deve ser um texto.");

  if (typeof product.providerName !== "string")
    error(res, "'Fornecedor' deve ser um texto.");

  if (typeof product.makerName !== "string")
    error(res, "'Fabricante' deve ser um texto.");

  if (typeof product.purchaseValue !== "number" || product.purchaseValue <= 0)
    error(res, "'Valor de compra' deve ser um número maior que zero.");

  if (typeof product.saleValue !== "number" || product.saleValue <= 0)
    error(res, "'Valor de venda' deve ser um número maior que zero.");

  if (
    typeof product.quantityStock !== "number" ||
    !Number.isInteger(product.quantityStock)
  )
    error(res, "'Estoque' deve ser um número inteiro.");

  if (
    typeof product.units !== "number" ||
    product.units <= 0 ||
    !Number.isInteger(product.units)
  )
    error(res, "'Unidades' deve ser um número inteiro e maior que zero.");

  if (product.unitValue) {
    if (
      typeof product.unitValue !== "number" ||
      product.unitValue <= 0 ||
      !Number.isInteger(product.unitValue)
    )
      error(res, "'Valor da unidade' deve ser um número maior que zero.");
  }

  if (
    typeof product.percentage !== "number" ||
    !Number.isInteger(product.percentage) ||
    product.percentage <= 0
  )
    error(res, "'Percentual' deve ser um número inteiro e maior que zero.");

  next();
};

const error = (res, message) => {
  return res.status(400).json({ status: "error", message });
};
