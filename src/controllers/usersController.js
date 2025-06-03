const Users = require("../models/UsersModel");
const bcrypt = require("bcryptjs");
const validator = require("validator");

exports.registerUser = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;

    if (await existingUser(email))
      return res
        .status(400)
        .json({ status: "error", message: "Este e-mail já está em uso" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const body = {
      userName: validator.blacklist(userName, "\\<>/&;*'-"),
      email: email.trim().toLowerCase(),
      password: hash,
      role: validator.blacklist(role, "\\<>/&;*'-"),
    };

    const user = new Users(body);
    await user.save();

    res
      .status(201)
      .json({ status: "success", message: "Usuário cadastrado com sucesso" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Não foi possível realizar o cadastro",
    });
  }
};

const existingUser = async (email) => {
  const user = await Users.findOne({ email });
  return user;
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await existingUser(email.toLowerCase());

    if (!user)
      return res
        .status(400)
        .json({ status: "error", message: "Credenciais de acesso inválidas" });

    const comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass)
      return res
        .status(400)
        .json({ status: "error", message: "Credenciais de acesso inválidas" });

    req.session.user = {
      id: user._id,
      userName: user.userName,
      role: user.role,
    };

    if (user.role === "administrator") {
      req.session.save(function () {
        return res.status(200).json({
          redirect: "/index",
          status: "success",
        });
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Erro ao tentar realizar login. Tente novamente mais tarde.",
    });
  }
};
