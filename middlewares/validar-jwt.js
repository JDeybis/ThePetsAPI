const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const validarJWT = (req, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.json({
      ok: false,
      msg: "Ingreso no autorizado.",
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    req.id = id;
    next();
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Token no válido.",
    });
  }
};

module.exports = {
  validarJWT,
};
