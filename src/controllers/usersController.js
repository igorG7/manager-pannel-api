const Users = require("../models/UsersModel");
const bcrypt = require("bcryptjs");
const validator = require("validator");

exports.registerUser = async (req, res) => {
  try {
    const { flag, name, email, password, role } = validationBodyToRegister(
      req.body
    );

    if (await existingUser(email))
      return res.status(400).json({ message: "Este e-mail já está em uso" });

    if (flag === false)
      return res.status(400).json({ message: "E-mail ou senha inválidos" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const body = {
      userName: name,
      email: email,
      password: hash,
      role: role,
    };

    const user = new Users(body);
    await user.save();

    res.status(201).json({ message: "Usuário cadastrado com sucesso" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Não foi possível realizar o cadastro" });
  }
};

const validationBodyToRegister = (body) => {
  let isEmail = validator.isEmail(body.email);
  let strongPasswordassword = validator.isStrongPassword(body.password);

  if (isEmail && strongPasswordassword) {
    let name = validator.blacklist(body.userName, "\\<>/&;*'-");
    let role = validator.blacklist(body.role, "\\<>/&;*'-");
    let email = validator.trim(body.email).toLowerCase();

    return { flag: true, name, email, role, password: body.password };
  }

  return { flag: false };
};

const existingUser = async (email) => {
  const user = await Users.findOne({ email });
  return user ? user : false;
};
