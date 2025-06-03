exports.home = (req, res) => {
  const user = res.locals.user;
  if (!user) return res.redirect("/login-administrator");
  if (user.role !== "administrator")
    return res.status(403).json({ message: "Erro 403: Acesso negado." });
  res.render("index");
};
