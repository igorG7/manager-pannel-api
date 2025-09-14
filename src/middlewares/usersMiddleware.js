import validator from "validator";

export const validationBodyRegister = (req, res, next) => {
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

export const controlPermissions = (req, res, next) => {
  const user = res.locals.user;

  if (!user) return res.redirect("/admin/login");
  if (user.role !== "administrator")
    return res.render("includes/error", {
      error: "403",
      message: "Acesso negado.",
    });

  next();
};
