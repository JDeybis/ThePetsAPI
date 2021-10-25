const { response } = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/UserModel");

const createUser = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya esta registrado",
      });
    }

    const user = new User(req.body);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    return res.json({
      ok: true,
      msg: "Usuario Creado",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};

module.exports = {
  createUser,
};
