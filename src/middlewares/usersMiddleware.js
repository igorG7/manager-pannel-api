const validator = require("validator");

exports.validationBodyRegister = (req, res, next) => {
  const body = req.body;

  const isEmail = validator.isEmail(body.email);
  const strongPasswordassword = validator.isStrongPassword(body.password);

  if (!isEmail || !strongPasswordassword) {
    return res
      .status(400)
      .json({ status: "error", message: "Credenciais de cadastro inválidas." });
  }

  next();
};
