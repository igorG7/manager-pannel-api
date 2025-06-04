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

exports.controlPermissions = (req, res, next) => {
  const user = res.locals.user;

  if (!user) return res.redirect("/login-administrator");
  if (user.role !== "administrator")
    return res.status(403).json({ message: "Erro 403: Acesso negado." });

  next();
};
