const { response } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generarJWT } = require("../helpers/jwt");
const User = require("../models/UserModel");

const login = async (req, res = respone) => {
  const { email, password } = req.body;

  try {
    const model = await User.findOne({ email });

    if (!model) {
      return res.status(404).json({
        ok: false,
        msg: "El Usuario no esta registrado!",
      });
    }

    const key_valid = bcrypt.compareSync(password, model.password);

    if (!key_valid) {
      return res.status(404).json({
        ok: false,
        msg: "Clave incorrecta.",
      });
    }

    const token = await generarJWT(model._id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: getMessage("msgErrorToken"),
    });
  }
};

const renovar_token = async (req, res = respone) => {
  try {
    const id = req.id;
    const token = await generarJWT(id);

    const user = await User.findById(id).populate("role", "name email role");

    return res.json({
      ok: true,
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: error.message,
    });
  }
};
module.exports = { login, renovar_token };
